'use client'
import { useEffect, useState } from 'react'
import { useAnimate } from 'framer-motion'

export default function Navigation(
  props: Readonly<{
    children: React.ReactNode
    isActive: boolean
  }>
) {
  const [isActive] = useState(props.isActive)
  const [scopeRef, animate] = useAnimate<HTMLUListElement>()

  useEffect(() => {
    scopeRef.current.onclick = (e: MouseEvent) => {
      // 예외처리하기 UL, LI일 경우
      if (e.target) {
        const el = e.target as HTMLElement
        // if achor tag is clicked, do nothing
        if (el.tagName === 'A') {
          return
        }

        const li = el.tagName === 'LI' ? el : el.closest('li')

        if (!li) {
          return alert('LI 태그가 없습니다.')
        }

        const divElement = li.querySelector('div') as HTMLDivElement
        const firstUlChild = divElement.querySelector('ul') as HTMLUListElement
        if (divElement?.tagName === 'DIV') {
          if (divElement.classList.contains('inactive-tree-node')) {
            divElement.classList.remove('inactive-tree-node')

            firstUlChild.style.height = '0'
            firstUlChild.classList.remove('hidden')
            animate(
              firstUlChild,
              { height: 'auto' },
              { ease: 'easeInOut', duration: 0.4 }
            )
          } else {
            divElement.classList.add('inactive-tree-node')

            animate(
              firstUlChild,
              { height: 0 },
              { ease: 'easeInOut', duration: 0.4 }
            )
          }
        }
      }
    }
  }, [])

  return (
    <ul
      ref={scopeRef}
      className={`inactive-node-tree ${isActive ? 'visible' : 'hidden'}`}
    >
      {props.children}
    </ul>
  )
}
