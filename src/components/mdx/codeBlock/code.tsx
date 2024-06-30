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

  if (
    !props.className &&
    typeof props.children === 'string' &&
    !props.children.includes('\n')
  ) {
    return (
      <code
        className=' text-rose-500 font-bold bg-slate-200 p-1 rounded-md text-xs not-italic font-mono'
        {...props}
      />
    )
  }

  const value = hljs.highlight(props.children as string, {
    language: LANGUAGES_MAP[props.className as string] || 'plaintext',
  }).value

  return (
    <div className='bg-slate-300 p-2 rounded-lg overflow-y-auto text-xs'>
      <code
        {...restProps}
        dangerouslySetInnerHTML={{ __html: value }}
        className='not-italic font-mono'
      ></code>
    </div>
  )
}
