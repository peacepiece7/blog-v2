import { RootContentMap } from 'mdast'
import React from 'react'
import { IoFolderOpenOutline, IoFolderOutline } from 'react-icons/io5'
import { TiDocument } from 'react-icons/ti'
import { GoHash } from 'react-icons/go'
import Link from 'next/link'
import { TreeNode } from '../app/api/navigation/route'

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
  return tree.map((node, idx) => {
    const dataPath = [...list, idx]
    if (node.leafNode && node.link) {
      const nodelinks = node.link.split('/')
      nodelinks.pop()
      nodelinks.push((idx + 1).toString())
      node.link = nodelinks.join('/')
    }
    // children 중 route.path와 같은 것이 있으면 open으로 상태 변경
    // main/tree/docker/example/architecture 이런 느낌으로 deepth와 path를 비교해서 open 상태로 변경
    return (
      <li
        key={node.text}
        data-path={dataPath.join('-')}
        data-deepth={deepth}
        data-leaf={node.leafNode ? 1 : 0}
        className={`list-disc ml-6 overflow-hidden`}
      >
        {node.leafNode && node.link ? (
          <span
            className='flex items-center
             hover:bg-gray-400 hover:bg-opacity-10
            '
          >
            <TiDocument className='mr-2 min-w-6 min-h-6 w-6 h-6' />
            <Link href={node.link} className='truncate'>
              {node.text}
            </Link>
          </span>
        ) : (
          <div className='inactive-tree-node'>
            <span
              className='
                flex items-center cursor-pointer
                hover:bg-gray-400 hover:bg-opacity-10
              '
            >
              <IoFolderOpenOutline className='folder-open mr-2 min-w-6 min-h-6 w-6 h-6' />
              <IoFolderOutline className='folder-close mr-2 min-w-6 min-h-6 w-6 h-6' />
              <p className='truncate'>{node.text}</p>
            </span>
            <ul
              // ${deepth === 0 ? 'hidden inactive-tree-node' : ''}
              className={`hidden list-disc ml-6 overflow-hidden`}
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
  headings: RootContentMap['heading'][]
): React.ReactElement => {
  const rootUl = React.createElement('ul', { key: 'root' })
  const stack = [
    { element: rootUl, depth: 0, children: [] as React.ReactElement[] },
  ]

  headings.forEach((heading, index) => {
    const { depth } = heading
    const text = heading.children
      .flatMap((node) => ('value' in node ? node.value : ''))
      .join('')
    const hashTag = text.replace(/\s+/g, '_').toLowerCase()
    const li = React.createElement(
      'li',
      {
        key: `li-${index}`,
        className: 'flex items-center list-disc ml-6 overflow-hidden',
        'data-deepth': depth,
      },
      React.createElement(GoHash, {
        className: 'mr-2 min-w-6 min-h-6 w-6 h-6',
      }),
      React.createElement(
        Link,
        {
          href: `#${hashTag}`,
        },
        text
      )
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

    const newUl = React.createElement('ul', {
      key: `ul-${index}`,
      className: 'list-disc ml-6 overflow-hidden',
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