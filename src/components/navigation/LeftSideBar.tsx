'use client'

import { Reducer, useReducer } from 'react'
import Navigation from './Navigation'
import { TableOfContents } from './TableOfContents'

export function LeftSideBar({ tabIdx = 0 }: { tabIdx: number }) {
  //   const [tabIdx ] = useReducer((state, action) => !state, tabIdx)

  const [tabIndex] = useReducer<Reducer<number, any>>(
    (_state, nextValue) => nextValue,
    tabIdx
  )

  return (
    <>
      <h1>Left Side Bar</h1>
      <div className='flex'>
        <button className='mr-10'>Navigation</button>
        <button>Table of Contents</button>
      </div>
      {tabIndex === 0 ? <Navigation /> : <TableOfContents />}
    </>
  )
}
