import { HTMLAttributes } from "react"

export function Button({
  children,
  className,
  onClick,
  options = {},
}: {
  children: React.ReactNode
  onClick?: HTMLAttributes<HTMLButtonElement>["onClick"]
  className?: HTMLAttributes<HTMLButtonElement>["className"]
  options?: {
    [key in keyof HTMLAttributes<HTMLButtonElement>]?: HTMLAttributes<HTMLButtonElement>[key]
  }
}) {
  return (
    <button
      className={`btn-common  ${className}`}
      onClick={onClick}
      {...options}
    >
      {children}
    </button>
  )
}
