"use client"
import mermaid, { MermaidConfig } from "mermaid"
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react"
import { Detail } from "../detail"
import { mainFont } from "@/utils/shared"

export const Mermaid = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  const codeRef = useRef<HTMLPreElement>(null)
  const [summaryTitle, _setSummaryTitle] = useState(
    () => setSummeryTitle(props.children as string) || "상세 보기"
  )

  useEffect(() => {
    if (!codeRef.current) return
    codeRef.current.className = `mermaid ${mainFont.className}`

    /**
     * @link {@see https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties} mermaid config properties
     */
    const config: MermaidConfig = {
      startOnLoad: false,
      fontFamily: mainFont.style.fontFamily,
      altFontFamily: mainFont.style.fontFamily,
      theme: "forest",
    }

    mermaid.initialize(config)
    mermaid.run()
  }, [])

  return (
    <Detail summaryTitle={summaryTitle}>
      <code ref={codeRef}>{props.children}</code>
    </Detail>
  )
}

function setSummeryTitle(text: string) {
  const firstCommentStartIndex = text.indexOf("%%")
  if (firstCommentStartIndex !== -1) {
    const firstCommentEndIndex = text
      .slice(firstCommentStartIndex)
      .indexOf("\n")
    return text.slice(firstCommentStartIndex + 2, firstCommentEndIndex).trim()
  }
}
