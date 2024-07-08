import { createTableOfContents } from '@/components/mdx/toc'
import { X_CUSTOM_URL } from '@/constants/server'
import { getPostPath } from '@/utils/fs'
import fs, { type Dirent } from 'fs'
import { headers } from 'next/headers'
import path from 'path'

export function LeftSideBar() {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || ''
  const isPostPage = headerList.get(X_CUSTOM_URL)?.includes('posts')
  const [_empty, _posts, ...rest] = url.split('/')
  const index = rest[rest.length - 1]
  rest.pop()
  rest.push('[index]')

  const postPath = ['src', 'app', 'posts', '@contents']
  const directoryPath = path.join(process.cwd(), ...postPath)

  const paths = getAllFilePaths(directoryPath)
  const tree = buildTree(paths, directoryPath)

  console.log('TREE : ', JSON.stringify(tree, null, 2))

  return (
    <>
      <div className='flex'>
        <button className='mr-10'>Navigation</button>
        <button>Table of Contents</button>
      </div>
      {isPostPage &&
        createTableOfContents(getPostPath(...rest), parseInt(index) - 1)}
    </>
  )
}
interface TreeNode {
  leafNode: boolean
  link: string | null
  text: string
  children: TreeNode[]
}

interface IntermediateNode {
  children: { [key: string]: IntermediateNode | LeafNode }
}

interface LeafNode {
  leafNode: boolean
  link: string
  text: string
  children: never[]
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
