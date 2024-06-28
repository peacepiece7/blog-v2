'use client'

import { hiMelody } from '@/utils/fonts'
import mermaid from 'mermaid'
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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!codeRef.current) return
    codeRef.current.className = `mermaid ${hiMelody.className}`
    mermaid.initialize({
      startOnLoad: false,
      fontFamily: hiMelody.style.fontFamily,
      altFontFamily: hiMelody.style.fontFamily,
      fontSize: 20,
    })
    setIsMounted(true)
    mermaid.run()

    return () => {
      // mermaid.cleanup()
      setIsMounted(false)
    }
  }, [])

  return (
    <code
      ref={codeRef}
      children={props.children}
      style={{ visibility: isMounted ? 'visible' : 'hidden' }}
    />
  )
}
