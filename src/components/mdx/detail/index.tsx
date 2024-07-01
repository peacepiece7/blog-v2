'use client'
import { MouseEventHandler, useRef, useState } from 'react'
import { hiMelody } from '@/utils/fonts'
import { FaAngleRight } from 'react-icons/fa6'

interface DetailProps {
  summaryTitle: string
  children: React.ReactNode
}
export const Detail = ({ summaryTitle, children }: DetailProps) => {
  const detailRef = useRef<HTMLDetailsElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const onToggle: MouseEventHandler<HTMLDetailsElement> = (_event) => {
    setIsOpen(!detailRef.current?.open)
  }
  // TODO : 뷰포트에 걸렸는지 체크해서 화면에 걸리면 처음 한 번만 열기

  return (
    <details ref={detailRef} className='list-none' onClick={onToggle}>
      <summary
        className={`list-none cursor-pointer ${hiMelody.className}`}
        onClick={onToggle}
      >
        <div
          className={`flex items-center transition-all
          `}
        >
          <FaAngleRight
            className={`mr-2 transition-all ${isOpen ? 'rotate-90 mb-1' : ''}`}
          />
          {summaryTitle}
        </div>
      </summary>
      {children}
    </details>
  )
}
