import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'

export const useNavAnimation = (tree: React.ReactNode) => {
  const [scopeRef, animate] = useAnimate<HTMLUListElement>()
  const navTree = (
    <ul ref={scopeRef} className={`inactive-node-tree visible`}>
      {tree}
    </ul>
  )

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
        if (!li) return

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
  }, [animate, scopeRef])

  return { scopeRef, navTree }
}
