'use client'
import { hiMelody } from '@/utils/fonts'
import mermaid, { MermaidConfig } from 'mermaid'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Detail } from '../detail'

export const Mermaid = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const codeRef = useRef<HTMLPreElement>(null)
  const [summaryTitle, _setSummaryTitle] = useState(
    () => setSummartTitle(props.children as string) || '상세 보기'
  )

  useEffect(() => {
    if (!codeRef.current) return
    codeRef.current.className = `mermaid ${hiMelody.className}`

    /**
     * @link {@see https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties} mermaid config properties
     */
    const config: MermaidConfig = {
      startOnLoad: false,
      fontFamily: hiMelody.style.fontFamily,
      altFontFamily: hiMelody.style.fontFamily,
      theme: 'forest',
    }

    mermaid.initialize(config)
    mermaid.run()
  }, [])

  return (
    <Detail summaryTitle={summaryTitle}>
      <code ref={codeRef} children={props.children} />
    </Detail>
  )
}

function setSummartTitle(text: string) {
  const firstCommentStartIndex = text.indexOf('%%')
  if (firstCommentStartIndex !== -1) {
    const firstCommentEndIndex = text
      .slice(firstCommentStartIndex)
      .indexOf('\n')
    return text.slice(firstCommentStartIndex + 2, firstCommentEndIndex).trim()
  }
}