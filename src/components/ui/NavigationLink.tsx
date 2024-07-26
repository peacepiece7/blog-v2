"use client"
import Link from "next/link"
import { useState } from "react"
import { usePostAreaSlideAction } from "@/contexts/usePostAreaContext"

export default function NavigationLink({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  const [loading, setIsLoading] = useState(false)
  const { setIsWorking, setNext } = usePostAreaSlideAction()

  return (
    <Link
      className="link truncate select-none"
      href={href}
      prefetch={true}
      onClick={(e) => {
        e.preventDefault()
        setIsWorking(true)
        setNext(href)
        setIsLoading(true)
      }}
      onKeyDown={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault()
          setIsWorking(true)
          setNext(href)
          setIsLoading(true)
        }
      }}
    >
      {loading ? <p>로딩중..!</p> : children}
    </Link>
  )
}
