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

export const Mermaid = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const codeRef = useRef<HTMLPreElement>(null)
  const [summaryTitle, setSummaryTitle] = useState(
    () => setSummartTitle(props.children as string) || '요약 보기'
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
      // themeCSS: `
      //   background-color: hsl(210, 8%, 80%);
      // `,
    }

    mermaid.initialize(config)
    mermaid.run()
  }, [])

  return (
    <details>
      <summary className={`cursor-pointer ${hiMelody.className}`}>
        {summaryTitle}
      </summary>
      <code ref={codeRef} children={props.children} />
    </details>
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
