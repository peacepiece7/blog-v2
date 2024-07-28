import { DetailedHTMLProps, HTMLAttributes } from "react"

export default function Anchor(
  props: DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  return <a {...props} target="_blank" className="link" />
}
