import Navigation from './Navigation'
import TableOfContents from './TableOfContents'
import { Heading, RootContentMap } from 'mdast'
import React from 'react'
import { fetcher } from '@/utils/fetcher'
import { TreeNode } from '@/app/api/navigation/route'
import { X_CUSTOM_URL } from '@/constants/server'
import { headers } from 'next/headers'
import { IoFolderOpenOutline, IoFolderOutline } from 'react-icons/io5'
import { TiDocument } from 'react-icons/ti'
import { GoHash } from 'react-icons/go'
import Link from 'next/link'

export async function LeftSideBar() {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || ''

  // Table of contents
  const isPostPage = url.includes('posts')

  const tocRes = await fetcher<{ tocTree: Heading[] }>(
    `/api/table-of-contents?url=${url}`,
    { cache: 'no-cache' }
  )

  const navRes = await fetcher<{ navTree: TreeNode[] }>(`/api/navigation`, {})

  return (
    <nav className='col-start-1 col-end-2 row-start-2 row-end-4 w-fit min-w-fit max-w-[50rem] px-10 overflow-y-scroll pt-4'>
      <Navigation isActive={!isPostPage}>
        {createNavElements(navRes.navTree, [], 0)}
      </Navigation>
      <TableOfContents isActive={isPostPage} rendingUrl={url}>
        {createTOCElements(tocRes.tocTree)}
      </TableOfContents>
    </nav>
  )
}

// navigation
const createNavElements = (
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
            <Link href={node.link}>{node.text}</Link>
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
              <p>{node.text}</p>
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

// table of contents
function createTOCElements(
  headings: RootContentMap['heading'][]
): React.ReactElement {
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
