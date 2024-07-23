"use client"
import { usePostAreaSlideAction } from "@/contexts/usePostAreaContext"
import Link from "next/link"
export default function NavigationLink({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  const { setIsWorking } = usePostAreaSlideAction()
  return (
    <Link
      className="truncate select-none ml-1"
      href={href}
      onClick={(e) => {
        setIsWorking(() => true)
        // e.preventDefault()
      }}
    >
      {children}
    </Link>
  )
}
