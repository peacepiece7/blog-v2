import Navigation from './Navigation'
import TableOfContents from './TableOfContents'
import { Heading, RootContentMap } from 'mdast'
import React from 'react'
import { fetcher } from '@/utils/fetcher'
import { TreeNode } from '@/app/api/navigation/route'
import { X_CUSTOM_URL } from '@/constants/server'
import { headers } from 'next/headers'

export async function LeftSideBar() {
  const headerList = headers()
  const url = headerList.get(X_CUSTOM_URL) || ''

  // Table of contents
  const isPostPage = url.includes('posts')

  const tocRes = await fetcher<{ tocTree: Heading[] }>(
    `/api/table-of-contents?url=${url}`
  )
  const navRes = await fetcher<{ navTree: TreeNode[] }>('/api/navigation')

  return (
    <nav className='col-start-1 col-end-2 row-start-2 row-end-4 w-fit min-w-fit max-w-[50rem] px-10 overflow-y-scroll'>
      <Navigation isActive={!isPostPage}>
        {createNavElements(navRes.navTree)}
      </Navigation>
      <TableOfContents isActive={isPostPage} rendingUrl={url}>
        {createTOCElements(tocRes.tocTree)}
      </TableOfContents>
    </nav>
  )
}

// navigation
const createNavElements = (tree: TreeNode[]): React.JSX.Element[] => {
  return tree.map((node, idx) => {
    if (node.leafNode && node.link) {
      const nodelinks = node.link.split('/')
      nodelinks.pop()
      nodelinks.push((idx + 1).toString())
      // Convert node.link from [/posts/js/concept.mdx, /posts/js/syntax.mdx] to [/posts/js/1, /posts/js/2]
      node.link = nodelinks.join('/')
    }

    return (
      <li key={node.text} className='list-disc ml-6'>
        {node.leafNode && node.link ? (
          <a href={node.link}>{node.text}</a>
        ) : (
          <>
            <span>{node.text}</span>
            <ul>{createNavElements(node.children)}</ul>
          </>
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
    const formattedText = text.replace(/\s+/g, '_')
    const li = React.createElement(
      'li',
      { key: `li-${index}`, className: 'list-disc ml-6' },
      React.createElement(
        'a',
        {
          href: `#${formattedText}`,
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

    // const parentUl = stack[stack.length - 1].element
    stack[stack.length - 1].children.push(li)

    const newUl = React.createElement('ul', {
      key: `ul-${index}`,
      className: 'list-disc ml-6',
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
