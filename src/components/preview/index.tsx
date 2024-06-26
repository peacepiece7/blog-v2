import { MDXComponents } from 'mdx/types'
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export const Preview = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
) => {
  // TODO : 적절한 width 선택하기 css math function (min, max, clamp)
  return <pre {...props} />
}
