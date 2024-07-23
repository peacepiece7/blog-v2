import { NAV_DIR_CLASS_ID } from "@/components/ui/NavigationParagraph"
import { useAnimate } from "framer-motion"
import { useCallback, useEffect } from "react"

/**
 * @description 네비게이션(목록)에 open/close 애니메이션을 추가합니다.
 * @param tree 네비게이션 트리 구조를 생성합니다.
 * @param urls 매칭되는 url 경로가 있다면 onMount시 open 상태로 변경합니다.
 * @returns
 */
export const useNavAnimation = (tree: React.ReactNode, urls: string[] = []) => {
  const [scopeRef, animate] = useAnimate<HTMLUListElement>()
  const navTree = (
    <ul ref={scopeRef} className={`inactive-node-tree visible`}>
      {tree}
    </ul>
  )

  useEffect(
    function openMatchedNode() {
      if (!scopeRef.current) return
      const navDirElements =
        scopeRef.current.querySelectorAll<HTMLParagraphElement>(
          `.${NAV_DIR_CLASS_ID}`
        )

      navDirElements.forEach((el) => {
        if (urls.find((url) => url === el.dataset["name"])) {
          const li = el.closest("li") as HTMLLIElement
          const divElement = li.querySelector("div") as HTMLDivElement
          const firstUlChild = divElement.querySelector("ul")
          if (!firstUlChild) return
          if (divElement?.tagName === "DIV") {
            divElement.classList.remove("inactive-tree-node")
            firstUlChild.style.height = "auto"
            firstUlChild.classList.remove("hidden")
          }
        }
      })
    },
    [scopeRef, urls]
  )

  useEffect(
    function highlightActiveNode() {
      const url = urls.join("/")
      const matchElement = document.querySelector<HTMLAnchorElement>(
        `a[href="${url}"]`
      )
      const parentElement = matchElement?.parentElement
      if (parentElement && parentElement.tagName === "SPAN") {
        parentElement.className =
          parentElement.className +
          " border rounded-md px-1 border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
      }
    },
    [scopeRef, urls]
  )

  /**
   * @description 'click' | 'touchstart' | 'keydown' 이벤트가 발생해면 navNode를 open/close 합니다.
   */
  const handleClickNavNode = useCallback(
    (e: MouseEvent | TouchEvent | KeyboardEvent) => {
      {
        // 예외처리하기 UL, LI일 경우
        if (e.target) {
          const el = e.target as HTMLElement
          // if achor tag is clicked, do nothing
          if (el.tagName === "A") {
            return
          }

          const li = el.tagName === "LI" ? el : el.closest("li")
          if (!li) return

          const divElement = li.querySelector("div")
          if (!divElement) return
          const firstUlChild = divElement.querySelector(
            "ul"
          ) as HTMLUListElement
          if (divElement?.tagName === "DIV") {
            if (divElement.classList.contains("inactive-tree-node")) {
              divElement.classList.remove("inactive-tree-node")
              firstUlChild.style.height = "0"
              firstUlChild.classList.remove("hidden")
              animate(
                firstUlChild,
                { height: "auto" },
                { ease: "easeInOut", duration: 0.2 }
              )
            } else {
              divElement.classList.add("inactive-tree-node")
              animate(
                firstUlChild,
                { height: 0 },
                { ease: "easeInOut", duration: 0.2 }
              )
            }
          }
        }
      }
    },
    [animate]
  )

  /**
   * @description "Enter"키를 누르면 handleClickNavNode로 이벤트를 전달합니다.
   */
  const handleKeydown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === "Enter") {
        handleClickNavNode(ev)
      }
    },
    [handleClickNavNode]
  )

  useEffect(
    function handleNavNodeInteraction() {
      const currentScopeRef = scopeRef.current
      if (!currentScopeRef) return

      currentScopeRef.addEventListener("click", handleClickNavNode)
      currentScopeRef.addEventListener("touchstart", handleClickNavNode)
      currentScopeRef.addEventListener("keydown", handleKeydown)

      return () => {
        if (!currentScopeRef) return
        currentScopeRef.removeEventListener("click", handleClickNavNode)
        currentScopeRef.removeEventListener("touchstart", handleClickNavNode)
        currentScopeRef.removeEventListener("keydown", handleKeydown)
      }
    },
    [animate, scopeRef, handleClickNavNode, handleKeydown]
  )

  return { scopeRef, navTree }
}
