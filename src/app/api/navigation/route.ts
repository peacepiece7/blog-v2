import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export interface TreeNode {
  leafNode: boolean
  link: string | null
  text: string
  children: TreeNode[]
}

export interface IntermediateNode {
  children: { [key: string]: IntermediateNode | LeafNode }
}

export interface LeafNode {
  leafNode: boolean
  link: string
  text: string
  children: never[]
}

export async function GET() {
  const postPath = ['src', 'app', 'posts', '@contents']
  const directoryPath = path.join(process.cwd(), ...postPath)
  const paths = getAllFilePaths(directoryPath)
  const navTree = buildTree(paths, directoryPath)

  return NextResponse.json({ navTree })
}

// 지정된 디렉터리 내의 모든 파일 경로를 재귀적으로 수집합니다.
function getAllFilePaths(dir: string): string[] {
  let results: string[] = []
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilePaths(filePath))
    } else if (path.extname(file) === '.mdx') {
      results.push(filePath)
    }
  })
  return results
}

// 트리 구조를 생성합니다.
function buildTree(paths: string[], baseDir: string): TreeNode[] {
  const tree: IntermediateNode = { children: {} }

  paths.forEach((filePath) => {
    const relativePath = path.relative(baseDir, filePath)
    const parts = relativePath
      .split(path.sep)
      .filter((part) => part !== '[index]')
    const fileName = parts.pop() as string
    let current = tree

    parts.forEach((part) => {
      if (!current.children[part]) {
        current.children[part] = { children: {} }
      }
      current = current.children[part] as IntermediateNode
    })

    const linkPath = `/posts/${parts.join('/')}/${fileName}`
    current.children[fileName] = {
      leafNode: true,
      link: linkPath,
      text: fileName,
      children: [],
    }
  })

  function convertToTreeFormat(
    node: IntermediateNode | LeafNode,
    nodeName: string,
    currentPath: string[]
  ): TreeNode {
    if ('leafNode' in node) {
      return {
        ...node,
        link: `/posts/${currentPath.join('/')}/${node.text}`,
      }
    }
    const children = Object.entries(node.children).map(([key, child]) =>
      convertToTreeFormat(child, key, [...currentPath, nodeName])
    )
    return {
      leafNode: false,
      link: null,
      text: nodeName,
      children,
    }
  }

  return Object.entries(tree.children).map(([key, child]) =>
    convertToTreeFormat(child, key, [])
  )
}
