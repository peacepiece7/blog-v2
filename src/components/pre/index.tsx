import { MDXComponents } from 'mdx/types'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

export const Preview = (props: HTMLAttributes<HTMLPreElement>) => {
  return <pre {...props} />
}
