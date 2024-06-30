'use client'
import { hiMelody } from '@/utils/fonts'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa6'
import mermaid, { MermaidConfig } from 'mermaid'
import {
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'

export const Mermaid = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const codeRef = useRef<HTMLPreElement>(null)
  const detailRef = useRef<HTMLDetailsElement>(null)
  const [isOpen, setIsOpen] = useState(false)
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

  const onToggle: MouseEventHandler<HTMLDetailsElement> = (_event) => {
    setIsOpen(!detailRef.current?.open)
  }

  return (
    <details ref={detailRef} className='list-none' onClick={onToggle}>
      <summary
        className={`list-none cursor-pointer ${hiMelody.className}`}
        onClick={onToggle}
      >
        <div
          className={`flex items-center transition-all
          `}
        >
          <FaAngleRight
            className={`mr-2 transition-all ${isOpen ? 'rotate-90 mb-1' : ''}`}
          />
          {summaryTitle}
        </div>
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
