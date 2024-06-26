'use client'
import mermaid from 'mermaid'
import { DetailedHTMLProps, HTMLAttributes, useEffect, useRef } from 'react'

export const Mermaid = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) => {
  // mermaid는 클라이언트 환경에서 동작합니다.
  // TODO : 로딩 스피너로 변경하기?
  if (typeof window === 'undefined') return <code children={props.children} />

  const codeRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (!codeRef.current) return
    codeRef.current.className = 'mermaid'
    console.log('props.children', codeRef.current.innerHTML)
    // codeRef.current.innerHTML = props.children as string

    // auth batch false여야함
    // mermaid.initialize({
    //   startOnLoad: false,
    //   theme: 'default',
    //   securityLevel: 'loose',
    // })

    mermaid.run()
    // setTimeout(() => {
    // }, 1000)
  }, [])

  // TODO : 로딩 스피너 추가하기
  return (
    <code
      ref={codeRef}
      children={props.children}
      style={{
        backgroundColor: 'hsl(210,8%,80%)',
        padding: '1rem',
        borderRadius: '0.5rem',
      }}
    />
  )
}
