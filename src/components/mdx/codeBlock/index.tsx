import { DetailedHTMLProps, HTMLAttributes } from 'react'
import 'highlight.js/styles/github.css'
import { Mermaid } from './mermaidBlock'
import { Code } from './code'

export const CodeBlock = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  if (props.className === 'language-mermaid') {
    return <Mermaid {...props} />
  } else {
    return <Code {...props} />
  }
}
