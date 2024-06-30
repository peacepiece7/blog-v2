import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export const Preview = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>
) => {
  return <pre {...props} />
}
