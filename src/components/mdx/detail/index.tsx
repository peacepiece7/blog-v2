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
          className={`group w-fit flex items-center pr-2 transition-colors border-[2px] border-transparent rounded-md hover:border-[2px] hover:border-gray-200 hover:bg-gray-100`}
        >
          <p>{summaryTitle}</p>
          <FaAngleRight
            className={`w-6 h-6 ml-1 transition-all group-hover:translate-x-1
              ${isOpen ? 'rotate-90 mb-1 translate-x-1' : 'mb-1'}`}
          />
        </div>
      </summary>
      {children}
    </details>
  )
}
