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
}

interface PostAreaSlideActionContextType {
  setIsWorking: Dispatch<SetStateAction<boolean>>
  setIsDone: Dispatch<SetStateAction<boolean>>
}

const PostAreaSlideValueContext = createContext<
  PostAreaSlideValueContextType | undefined
>(undefined)
const PostAreaSlideActionContext = createContext<
  PostAreaSlideActionContextType | undefined
>(undefined)

export function PostAreaSlideProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isWorking, setIsWorking] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const contentsRef = useRef<HTMLElement>(null)

  return (
    <PostAreaSlideActionContext.Provider value={{ setIsDone, setIsWorking }}>
      <PostAreaSlideValueContext.Provider
        value={{
          contentsRef,
          isWorking,
          isDone,
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
