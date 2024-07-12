'use client'
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { useAnimate } from 'framer-motion'

export default function TableOfContents(props: {
  children: React.ReactNode
  isActive: boolean
  rendingUrl: string
}) {
  // const pathname = usePathname()
  const [isActive, setIsActive] = useState(props.isActive)
  const [scopeRef, animate] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    // if (typeof window === 'undefined' || !tocRef.current) return
    // tocRef.current.addEventListener('click', (e: any) => {
    //   console.log('🚀 ~ useEffect ~ e:', e)
    // }

    scopeRef.current.onclick = (e: MouseEvent) => {
      // 예외처리하기 UL, LI일 경우
      if (e.target) {
        const el = e.target as HTMLElement
        const li = el.tagName === 'LI' ? el : el.parentElement
        if (!li) {
          return alert('LI 태그가 없습니다.')
        }
        const nextSiblingEl = li.nextElementSibling
        if (nextSiblingEl?.tagName === 'UL') {
          if (nextSiblingEl.classList.contains('inactive-toc-tree')) {
            nextSiblingEl.classList.remove('inactive-toc-tree')
            animate(nextSiblingEl, { opacity: 1, y: 5 })
          } else {
            nextSiblingEl.classList.add('inactive-toc-tree')
            animate(nextSiblingEl, { opacity: 0, y: -5 })
          }
        }
      }
    }
  }, [])

  return (
    <div ref={scopeRef} className={`${isActive ? 'visible' : 'hidden'}`}>
      {props.children}
    </div>
  )
}
