'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navigation(props: {
  children: React.ReactNode
  isActive: boolean
}) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(props.isActive)

  useEffect(() => {
    setIsActive(!pathname.includes('posts'))
  }, [pathname])

  return (
    <div className={`${isActive ? 'visible' : 'hidden'}`}>{props.children}</div>
  )
}
