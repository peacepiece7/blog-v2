import { DetailedHTMLProps, HTMLAttributes } from 'react'

export default function Anchor(
  props: DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  return (
    <a
      {...props}
      target='_blank'
      className={`
        text-blue-500 font-medium transition-all 
        hover:text-blue-700 hover:underline 
        visited:text-purple-500 visited:underline
        visited:hover:text-purple-700 visited:hover:underline
        active:hover:text-red-400 active:hover:underline
      `}
    />
  )
}
