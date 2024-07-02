import React, { type ComponentPropsWithoutRef } from 'react'

interface HeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  props: ComponentPropsWithoutRef<'h1'>
}

export function Heading({ as, props }: HeadingProps) {
  const manager = new HeaderComponentManager()
  const children = props.children as string
  // return HEADING[as](children)
  return manager.createHeadingCompnent(as, children)
}

/**
 * @note heading tag의 스타일을 정의합니다.
 */

class HeaderComponentManager {
  HEADING_MAPPER = {
    h1: {
      className: 'text-6xl leading-[6rem] mt-8',
    },
    h2: {
      className: 'text-5xl leading-[5rem] mt-8',
    },
    h3: {
      className: 'text-4xl leading-[4rem] mt-8',
    },
    h4: {
      className: 'text-3xl leading-[4rem] mt-8',
    },
    h5: {
      className: 'text-2xl leading-[4rem] mt-8',
    },
    h6: {
      className: 'text-xl leading-[4rem] mt-8',
    },
  }

  constructor() {}

  // prettier-ignore
  createHeadingCompnent( tag: keyof typeof this.HEADING_MAPPER, node: string | JSX.Element[]) {
      return this.createReaderbleId(node, (id) => {
        const anchor = React.createElement('a', { href: `#${id}`, target: '_self' }, node)
        const header = React.createElement(tag, { className: this.HEADING_MAPPER[tag].className, id }, anchor)
        return header
      })
  }

  private createReaderbleId(
    node: string | JSX.Element[],
    cb: (id: string) => JSX.Element
  ) {
    let plainText = ''
    if (typeof node === 'object') {
      node.forEach((obj) => {
        plainText += this.extactText(obj, '')
      })
    } else plainText = node

    const id = plainText.replace(/\s+/g, '_').toLowerCase().trim()
    return cb(id)
  }

  private extactText(node: JSX.Element, text: string): string | JSX.Element {
    if (!node?.props?.children) {
      if (typeof node === 'string') text += node
      return text
    }

    if (Array.isArray(node.props.children)) {
      return node.props.children.forEach((child: JSX.Element) => {
        return this.extactText(child, text)
      })
    } else return this.extactText(node.props.children, text)
  }
}
