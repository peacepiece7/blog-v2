"server only"
import { headers } from "next/headers"
import { readdirSync, readFileSync } from "fs"
import path from "path"
import { unified } from "unified"
import markdown from "remark-parse"
import type { RootContentMap } from "mdast"

/**
 * @description fetch api의 래퍼 함수입니다.
 * @param path /api/...?query=... 형태로 입력한다.
 */
export const fetcher = async <T>(path: string, options?: RequestInit) => {
  const headerList = headers()
  const host = headerList.get("host")
  // const sheme = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const url = `http://${host}${path}`
  return fetch(url, options)
    .then((res) => res.json() as T)
    .catch((error) => {
      console.error(error)
      throw new Error("FETCHER ERROR : " + error)
    })
}

/**
 * @description 파일 이름 목록을 안전하게 가져옵니다.
 * @param path  파일 경로
 * @param format  파일 확장자
 * @returns  파일 이름 목록
 *
 * @note try - catch 구문이 포함되어 있습니다.
 */
export const getFileNamesSafely = (path: string, format: string) => {
  try {
    const fileNames = readdirSync(path, {
      recursive: false,
      withFileTypes: true,
    })
    // .filter((dirent) => dirent.isFile() && dirent.name.endsWith(format))
    return fileNames
  } catch (error) {
    console.trace(error)
    return []
  }
}

/**
 * @description AST 트리를 안전하게 가져옵니다.
 * @param path  파일 경로
 * @param nodeType 노드 타입
 * @returns  AST 트리
 *
 * @note try - catch 구문이 포함되어 있습니다.
 */
export const getASTTreeSafely = <T extends keyof RootContentMap>(
  path: string,
  nodeType: T
): RootContentMap[T][] => {
  try {
    const buffer = readFileSync(path)
    const mdAst = unified().use(markdown).parse(buffer.toString())
    const headingNodes = mdAst.children.filter(
      (n): n is RootContentMap[T] => n.type === nodeType
    )
    return headingNodes
  } catch (error) {
    console.trace(error)
    return []
  }
}

/**
 * @description 포스트 파일의 full path를 가져옵니다.
 */
export const getPostFullPath = (...paths: string[]) => {
  return path.join(path.resolve(), "src", "app", "posts", "@contents", ...paths)
}

/**
 * .dx 파일 이름을 읽기 좋은 형태로 변환합니다.
 * @example convertToReadableText("01. Getting Started.mdx") : "Getting Started"
 */
export const convertMDXFileNameToReadableText = (text: string) => {
  const li = text.split(" ")[0]
  if (isNaN(parseInt(li))) {
    return text.replace(/\.mdx?$/, "")
  } else {
    return text
      .split(" ")
      .slice(1)
      .join(" ")
      .replace(/\.mdx?$/, "")
  }
}
