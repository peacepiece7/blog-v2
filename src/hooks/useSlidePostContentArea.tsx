import { ContentsLoading } from '@/app/posts/@contents/loading'
import { memo, useEffect, useRef, useState } from 'react'

// zustand 써야할듯
export const useSlidePostContentArea = () => {
  const [isWorking, setIsWorking] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const contentsRef = useRef<HTMLDivElement>(null)

  const ContentsLoadingFrame = memo(function ContentLoadingFrameMemo() {
    return <ContentsLoading ref={contentsRef} />
  }) // Add an empty array as the second argument

  useEffect(() => {
    if (!isWorking) return
    // slide contentfRef from left to right
    if (!contentsRef.current) return
    contentsRef.current.style.transition = 'transform 0.5s ease-in-out'
    contentsRef.current.style.transform = 'translateX(100%)'

    setTimeout(() => {
      setIsWorking(false)
      setIsDone(true)
    }, 500)
  }, [isWorking])

  return {
    ContentsLoadingFrame,
    isWorking,
    isDone,
    setIsWorking,
  }
}
