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
    dir = dir.replaceAll(path.sep, "/").replaceAll("\\", "/")

    const left = dir.split("@contents/")[1]
    const key = left.split("/[pageId]")[0]
    if (key) {
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
      const parts = relativePath.split(path.sep)
      const fileName = parts.pop()
      const link = `/posts/${key}/${idx + 1}`
      const text = `${key}/${convertMDXFileNameToReadableText(fileName || "")}`
      tree.push({
        link,
        text,
      })
    })
  })

  return tree
}
