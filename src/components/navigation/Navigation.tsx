'use client'
import { useNavAnimation } from '@/hooks/useNavAnimation'
import { useState } from 'react'

export default function Navigation(
  props: Readonly<{
    navChildren: React.ReactNode
    tocChildren: React.ReactNode
    isActive: boolean
  }>
) {
  const { navTree } = useNavAnimation(props.navChildren)
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <nav className='col-start-1 col-end-2 row-start-2 row-end-4 w-fit min-w-fit max-w-[50rem] px-10 overflow-y-scroll pt-4'>
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
        {props.tocChildren}
      </div>
    </nav>
  )
}
