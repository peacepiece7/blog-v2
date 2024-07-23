import {
  usePostAreaSlideAction,
  usePostAreaSlideValue,
} from "@/contexts/usePostAreaContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

// zustand 써야할듯
export const usePostAreaSlideAnimation = () => {
  const router = useRouter()
  const { isWorking, contentsRef, isDone, next } = usePostAreaSlideValue()
  const { setIsWorking, setIsDone, setNext } = usePostAreaSlideAction()

  useEffect(
    function animateContentsOnWorkStart() {
      if (!contentsRef.current) return
      if (isWorking) {
        contentsRef.current.classList.remove("invisible")
        contentsRef.current.style.visibility = "visible"
        contentsRef.current.style.transform = "translateX(0%)"
        contentsRef.current.style.opacity = "1"
        setTimeout(() => {
          setIsDone(true)
        }, 700)
      }
    },
    [contentsRef, isWorking, setIsDone]
  )

  useEffect(
    function triggerNextRouteOnDone() {
      if (!isDone) return
      next && router.push(next)
      setNext("")
      setIsWorking(false)
    },
    [isDone, next, router, setNext, setIsWorking]
  )

  return { contentsRef }
}
