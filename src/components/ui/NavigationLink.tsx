'use client'
import { useSlidePostContentArea } from '@/hooks/useSlidePostContentArea'
import Link from 'next/link'
export default function NavigationLink({
  href,
  children,
}: Readonly<{
  href: string
  children: React.ReactNode
}>) {
  const { setIsWorking } = useSlidePostContentArea()

  return (
    <Link
      className='truncate select-none ml-1'
      href={href}
      onClick={(e) => {
        console.log('e.target : ', e.target)
        setIsWorking(true)
        e.preventDefault()
      }}
    >
      {children}
    </Link>
  )
}
