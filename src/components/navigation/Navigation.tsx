'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function Navigation(props: {
  children: React.ReactNode
  isActive: boolean
}) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(props.isActive)
  const ulRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    setIsActive(!pathname.includes('posts'))
  }, [pathname])

  return (
    <ul ref={ulRef} className={`${isActive ? 'visible' : 'hidden'}`}>
      {props.children}
    </ul>
  )
}
