"use client"
import { BiX } from "react-icons/bi"
import { HTMLAttributes } from "react"

export default function CloseIcon({
  options = {},
  className,
}: {
  options?: {
    [K in keyof HTMLAttributes<SVGElement>]: HTMLAttributes<SVGElement>[K]
  }
  className?: HTMLAttributes<SVGElement>["className"]
}) {
  return (
    <BiX
      {...options}
      className={`min-w-6 min-h-6 w-6 h-6 ${className || ""}`}
    />
  )
}
