import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"
import { convertMDXFileNameToReadableText } from "@/utils/server"

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
  const postPath = ["src", "app", "posts", "@contents"]
  const directoryPath = path.join(process.cwd(), ...postPath)
  const paths = getAllFilePaths(directoryPath)
  const list = buildSearchList(paths, directoryPath)
  console.log("DIRECTORY PATH : ", directoryPath)
  console.log("PATHS : ", paths)
  console.log("LIST : ", list)
  return NextResponse.json({ list })
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
    } else if (path.extname(file) === ".mdx") {
      results.push(filePath)
    }
  })
  return results
}

export type SearchItem = {
  link: string
  text: string
}
function buildSearchList(dirs: string[], baseDir: string): any {
  const tree: SearchItem[] = []

  /**
   * @example
   * group : {
   *   "docker" : ["src/app/posts/@contents/docker/1.mdx", "src/app/posts/@contents/docker/2.mdx"],
   *   "kubernetes" : ["src/app/posts/@contents/kubernetes/1.mdx", "src/app/posts/@contents/kubernetes/2.mdx"],
   * }
   */
  const group: { [key in any]: string[] } = {}
  dirs.forEach((dir) => {
    dir = dir.replaceAll(path.sep, "\\")
    const regExp = /(?<=@contents\\)([^\\]+\\[^\\]+)/g
    const match = dir.match(regExp)
    if (match) {
      const key = match[0].replace(/\\/g, "/")
      if (group[key]) {
        group[key].push(dir)
      } else {
        group[key] = [dir]
      }
    }
  })

  Object.keys(group).forEach((key) => {
    group[key].forEach((filePath, idx) => {
      const relativePath = path.relative(baseDir, filePath)
      const parts = relativePath
        .split(path.sep)
        .filter((part) => part !== "[pageId]")
      const fileName = parts.pop() as string
      const link = `/posts/${parts.join("/")}/${idx + 1}`
      // prettier-ignore
      const text = `${parts.join("/")}/${convertMDXFileNameToReadableText(fileName)}`
      tree.push({
        link,
        text,
      })
    })
  })

  return tree
}
