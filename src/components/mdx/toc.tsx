import { unified } from 'unified'
import markdown from 'remark-parse'
import { readFile } from 'fs'
import React from 'react'
import type { RootContentMap } from 'mdast'

export async function createTableOfContents(path: string) {
  const heainds = await new Promise<RootContentMap['heading'][]>((res) => {
    readFile(`${path}/page.mdx`, (error, buffer) => {
      if (error) {
        console.error(error)
        res([])
      } else {
        const mdAst = unified().use(markdown).parse(buffer.toString())
        const headingNodes = mdAst.children.filter(
          (node) => node.type === 'heading'
        )
        res(headingNodes)
      }
    })
  })

  return createTOC(heainds)
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
    const li = React.createElement(
      'li',
      { key: `li-${index}`, className: 'list-disc ml-6' },
      text
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
