"use client"
import { HTMLAttributes } from "react"
export const NAV_DIR_CLASS_ID = "nav-dir"

export default function NavigationDirButton({
  name = "",
  children,
  className = "",
}: Readonly<{
  name?: string
  children: React.ReactNode
  className?: HTMLAttributes<HTMLParagraphElement>["className"]
}>) {
  return (
    <button
      className={`${NAV_DIR_CLASS_ID} text-clickable focus:text-red-400 truncate select-none leading-10 ${className}`}
      data-name={name}
    >
      {children}
    </button>
  )
}
