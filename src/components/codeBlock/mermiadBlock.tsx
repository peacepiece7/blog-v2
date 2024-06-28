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
  if (typeof window === 'undefined')
    return <code children={props.children} style={{ visibility: 'hidden' }} />

  const codeRef = useRef<HTMLPreElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!codeRef.current) return
    setIsMounted(true)
    codeRef.current.className = `mermaid ${hiMelody.className}`
    mermaid.initialize({
      startOnLoad: false,
      fontFamily: hiMelody.style.fontFamily,
      altFontFamily: hiMelody.style.fontFamily,
      fontSize: 20,
    })
    mermaid.run()
  }, [])

  return (
    <code
      ref={codeRef}
      children={props.children}
      style={{ visibility: isMounted ? 'visible' : 'hidden' }}
    />
  )
}
