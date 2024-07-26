import { RootContentMap } from "mdast"
import React from "react"
import { TreeNode } from "../app/api/navigation/route"
import DocumentIcon from "@/components/ui/Icons/DocumentIcon"
import NavigationLink from "@/components/ui/NavigationLink"
import FolderOpenIcon from "@/components/ui/Icons/FolderOpenIcon"
import FolderCloseIcon from "@/components/ui/Icons/FolderCloseIcon"
import NavigationDirButton from "@/components/ui/NavigationParagraph"

/**
 * @description 네비게이션에 사용되는 트리 구조를 생성합니다.
 * @param tree
 * @param list
 * @param deepth
 * @returns
 */
export const createNavElements = (
  tree: TreeNode[],
  list: number[],
  deepth: number
): React.JSX.Element[] => {
  // 텍스트를 읽기 좋게 변환합니다.
  const convertToReadableText = (text: string) => {
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

  return tree.map((node, idx) => {
    const dataPath = [...list, idx]
    if (node.leafNode && node.link) {
      const nodelinks = node.link.split("/")
      nodelinks.pop()
      nodelinks.push((idx + 1).toString())
      node.link = nodelinks.join("/")
    }
    // children 중 route.path와 같은 것이 있으면 open으로 상태 변경
    // main/tree/docker/example/architecture 이런 느낌으로 deepth와 path를 비교해서 open 상태로 변경
    return (
      <li
        key={node.text}
        data-path={dataPath.join("-")}
        data-deepth={deepth}
        data-leaf={node.leafNode ? 1 : 0}
        className={`ml-4 overflow-hidden`}
      >
        {node.leafNode && node.link ? (
          <NavigationLink href={node.link}>
            <div className="flex items-center hover:bg-gray-400 hover:bg-opacity-10 mr-4">
              <DocumentIcon options={{ tabIndex: -1 }} />
              <p className="truncate">{convertToReadableText(node.text)}</p>
            </div>
          </NavigationLink>
        ) : (
          <div className="inactive-tree-node mr-4">
            <NavigationDirButton
              name={node.text}
              className="flex items-center w-full hover:bg-gray-400 hover:bg-opacity-10"
            >
              <FolderOpenIcon />
              <FolderCloseIcon />
              <span className="pl-2">{node.text}</span>
            </NavigationDirButton>

            <ul
              // ${deepth === 0 ? 'hidden inactive-tree-node' : ''}
              className={`hidden ml-4 overflow-hidden`}
            >
              {createNavElements(node.children, dataPath, deepth + 1)}
            </ul>
          </div>
        )}
      </li>
    )
  })
}

/**
 * @description Table of Contents를 생성합니다.
 * @param headings
 * @returns
 */
export const createTOCElements = (
  headings: RootContentMap["heading"][]
): React.ReactElement => {
  const rootUl = React.createElement("ul", { key: "root" })
  const stack = [
    { element: rootUl, depth: 0, children: [] as React.ReactElement[] },
  ]

  headings.forEach((heading, index) => {
    const { depth } = heading
    const text = heading.children
      .flatMap((node) => ("value" in node ? node.value : ""))
      .join("")
    const hashTag = text.replace(/\s+/g, "_").toLowerCase()
    const li = React.createElement(
      "li",
      {
        key: `li-${index}`,
        className:
          "flex items-center ml-4 overflow-hidden mr-4 hover:bg-gray-400 hover:bg-opacity-10",
        "data-deepth": depth,
      },
      <a href={`#${hashTag}`} className="link">
        {"# " + text}
      </a>
    )
    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      const { element, children } = stack.pop()!
      if (children.length > 0) {
        stack[stack.length - 1].children.push(
          React.cloneElement(element, {}, children)
        )
      }
    }

    stack[stack.length - 1].children.push(li)

    const newUl = React.createElement("ul", {
      key: `ul-${index}`,
      className: "ml-4 overflow-hidden",
    })
    stack.push({ element: newUl, depth, children: [] as React.ReactElement[] })
  })

  while (stack.length > 1) {
    const { element, children } = stack.pop()!
    stack[stack.length - 1].children.push(
      React.cloneElement(element, {}, children)
    )
  }

  const { element, children } = stack.pop()!

  return React.cloneElement(element, {}, children)
}
