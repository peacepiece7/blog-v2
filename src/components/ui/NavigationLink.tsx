"use client"
import Link from "next/link"
import { Router } from "next/router"
import { useState } from "react"
import { MainPageLayout } from "@/components/layout/Layout"
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
      className="block truncate select-none ml-1 link"
      href={href}
      prefetch={true}
      onClick={(e) => {
        e.preventDefault()
        setIsWorking(true)
        setNext(href)
        setIsLoading(true)
      }}
    >
      {loading ? <p>로딩중..!</p> : children}
    </Link>
  )
}
