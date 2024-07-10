'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useEffect, useState } from 'react'

export default function TableOfContents(props: {
  children: React.ReactNode
  isActive: boolean
  rendingUrl: string
}) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(props.isActive)

  useEffect(() => {
    setIsActive(pathname.includes('posts'))
  }, [])

  return (
    <div className={`${isActive ? 'visible' : 'hidden'}`}>{props.children}</div>
  )
}
