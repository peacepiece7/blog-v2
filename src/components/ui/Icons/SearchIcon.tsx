import { AiOutlineSearch } from "react-icons/ai"
import { HTMLAttributes } from "react"

export default function SearchIcon({
  options = {},
  className,
}: {
  options?: {
    [K in keyof HTMLAttributes<SVGElement>]: HTMLAttributes<SVGElement>[K]
  }
  className?: HTMLAttributes<SVGElement>["className"]
}) {
  return (
    <AiOutlineSearch
      {...options}
      className={`min-w-6 min-h-6 w-6 h-6 ${className || ""}`}
    />
  )
}
