import { DetailedHTMLProps, HTMLAttributes, useRef } from 'react'
import hljs from 'highlight.js'
import { hiMelody } from '@/utils/fonts'

const LANGUAGES_MAP: Record<string, string> = {
  'language-js': 'javascript',
  'language-ts': 'typescript',
  'language-json': 'json',
  'language-html': 'html',
  'language-css': 'css',
  'language-yaml': 'yaml',
  'language-py': 'python',
  'language-cpp': 'cpp',
  'language-java': 'java',
  'language-c': 'c',
  'language-go': 'go',
  'language-rust': 'rust',
}

export const Code = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const { children, ...restProps } = props

  let value = hljs.highlight(props.children as string, {
    language: LANGUAGES_MAP[props.className as string] || 'plaintext',
  }).value

  return (
    <div
      style={{
        backgroundColor: 'hsl(210,8%,80%)',
        padding: '1rem',
        borderRadius: '0.5rem',
        fontSize: '1.6rem',
      }}
    >
      <code {...restProps} dangerouslySetInnerHTML={{ __html: value }}></code>
    </div>
  )
}
