import {
  usePostAreaSlideAction,
  usePostAreaSlideValue,
} from "@/contexts/usePostAreaContext"
import { useEffect } from "react"

// zustand 써야할듯
export const usePostAreaSlideAnimation = () => {
  const { isWorking, contentsRef, isDone } = usePostAreaSlideValue()
  const { setIsWorking, setIsDone } = usePostAreaSlideAction()

  useEffect(() => {
    console.log("isWorking", isWorking)
    console.log("isDone", isDone)
    console.log("REF : ", contentsRef.current)
    if (!contentsRef.current) return
    contentsRef.current.style.transition = "transform 1s ease-in-out"
    if (isWorking) {
      contentsRef.current.style.transform = "translateX(0%)"
    } else {
    }

    setTimeout(() => {
      setIsWorking(false)
      setIsDone(true)
    }, 500)
  }, [contentsRef, isWorking, setIsWorking, setIsDone, isDone])

  return { contentsRef }
}
