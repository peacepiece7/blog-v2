'use client'
import { useNavAnimation } from '@/hooks/useNavAnimation'
import { useResizeSidebar } from '@/hooks/useResizeSidebar'
import { useRef, useState } from 'react'

export default function Navigation({
  navChildren,
  tocChildren,
  activeTab = 'nav',
}: Readonly<{
  navChildren: React.ReactNode
  tocChildren: React.ReactNode
  activeTab: 'nav' | 'toc'
}>) {
  const navRef = useRef<HTMLDivElement>(null)
  const { barRef, sideBarWidth } = useResizeSidebar()
  const { navTree } = useNavAnimation(navChildren)
  const [activeIdx, setActiveIdx] = useState(activeTab === 'nav' ? 0 : 1)

  return (
    <div className='relative h-auto col-start-1 col-end-2 row-start-2 row-end-4 flex px-10 mt-4 group'>
      <nav
        ref={navRef}
        className='relative h-full overflow-y-scroll z-10'
        style={{ width: `${sideBarWidth}px` }}
      >
        <div>
          <button className='mr-4' onClick={() => setActiveIdx(0)}>
            navigation
          </button>
          <button onClick={() => setActiveIdx(1)}>table of contents</button>
        </div>
        <div className={`${activeIdx === 0 ? 'visible' : 'hidden'}`}>
          {navTree}
        </div>
        <div className={`${activeIdx === 1 ? 'visible' : 'hidden'}`}>
          {tocChildren}
        </div>
      </nav>
      <div
        draggable
        ref={barRef}
        className={`
        absolute w-4 h-full top-0 bottom-0 right-8 m-auto bg-slate-300 opacity-5
        transition-all ease-in-out cursor-col-resize
        group-hover:opacity-100 group-hover:right-6 duration-300 hover:bg-slate-400
        `}
      />
    </div>
  )
}
