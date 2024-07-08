import { readdirSync, readFileSync } from 'fs'
import { unified } from 'unified'
import markdown from 'remark-parse'
import type { RootContentMap } from 'mdast'
import path from 'path'

/**
 * @param path  파일 경로
 * @param format  파일 확장자
 * @returns  파일 이름 목록
 * @note 파일 이름 목록을 안전하게 가져옵니다. try - catch 구문이 포함되어 있습니다.
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
 * @param path  파일 경로
 * @param nodeType 노드 타입
 * @returns  AST 트리
 * @note AST 트리를 안전하게 가져옵니다. try - catch 구문이 포함되어 있습니다.
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

export const getPostPath = (...paths: string[]) => {
  return path.join(path.resolve(), 'src', 'app', 'posts', '@contents', ...paths)
}
