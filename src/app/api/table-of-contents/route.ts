import { getASTTreeSafely, getFileNamesSafely, getPostPath } from '@/utils/fs'
import { RootContentMap } from 'mdast'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams
    const url = searchParams.get('url')?.split('/')

    if (!url || 2 >= url.length) return NextResponse.json({ tocTree: [] })

    const [_empty, _posts, ...rest] = url
    const index = rest[rest.length - 1]
    rest.pop()
    rest.push('[index]')

    const tocTree = await createTableOfContents(
      getPostPath(...rest),
      parseInt(index) - 1
    )

    return NextResponse.json({
      tocTree: tocTree,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.error()
  }
}

// * Table of Contents
export async function createTableOfContents(path: string, index: number = 0) {
  const fileNames = getFileNamesSafely(path, '.mdx')

  if (fileNames.length === 0) return ''
  const headingNodes = getASTTreeSafely<'heading'>(
    `${path}/${fileNames[index]?.name}`,
    'heading'
  )
  return headingNodes
}

function createTOC(headings: RootContentMap['heading'][]): React.ReactElement {
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
