"use client"
import { TiDocument } from "react-icons/ti"
import { HTMLAttributes } from "react"

export default function DocumentIcon({
  options = {},
}: {
  options?: {
    [K in keyof HTMLAttributes<SVGElement>]: HTMLAttributes<SVGElement>[K]
  }
}) {
  return <TiDocument {...options} className={`min-w-6 min-h-6 w-6 h-6`} />
}
