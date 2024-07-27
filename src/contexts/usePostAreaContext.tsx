"use client"
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react"

interface PostAreaSlideValueContextType {
  contentsRef: React.RefObject<HTMLElement>
  isWorking: boolean
  isDone: boolean
  next: string
}

interface PostAreaSlideActionContextType {
  setIsWorking: Dispatch<SetStateAction<boolean>>
  setIsDone: Dispatch<SetStateAction<boolean>>
  setNext: Dispatch<SetStateAction<string>>
}

const PostAreaSlideValueContext = createContext<
  PostAreaSlideValueContextType | undefined
>(undefined)
const PostAreaSlideActionContext = createContext<
  PostAreaSlideActionContextType | undefined
>(undefined)

/**
 * 목록을 이동하면 포스트 페이지가 스르륵 이동하는 애니메이션을 제공하는 프로바이더입니다.
 *
 * 아래 컨텍스트 훅을 참고하세요.
 *
 * @see {@linkcode usePostAreaSlideValue}
 * @see {@linkcode usePostAreaSlideAction}
 */
export function PostAreaSlideProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isWorking, setIsWorking] = useState(false)
  const [next, setNext] = useState("")
  const [isDone, setIsDone] = useState(false)
  const contentsRef = useRef<HTMLElement>(null)

  return (
    <PostAreaSlideActionContext.Provider
      value={{ setIsDone, setIsWorking, setNext }}
    >
      <PostAreaSlideValueContext.Provider
        value={{
          contentsRef,
          isWorking,
          isDone,
          next,
        }}
      >
        {children}
      </PostAreaSlideValueContext.Provider>
    </PostAreaSlideActionContext.Provider>
  )
}

export function usePostAreaSlideValue() {
  const context = useContext(PostAreaSlideValueContext)
  if (context === undefined) {
    throw new Error(
      "usePostAreaSlideValue must be used within a PostAreaProvider"
    )
  }
  return context
}

export function usePostAreaSlideAction() {
  const context = useContext(PostAreaSlideActionContext)
  if (context === undefined) {
    throw new Error(
      "usePostAreaSlideAction must be used within a PostAreaProvider"
    )
  }
  return context
}
