import { Header } from '@/components/header'
import { ContentsLayout } from '@/components/layout/Layout'
import React from 'react'

export default function PostsLayout(
  props: Readonly<{
    children: React.ReactNode
    navigation: React.ReactNode
    contents: React.ReactNode
  }>
) {
  return (
    <div className='grid grid-cols-[fit-content(100%)_1fr_1fr] grid-rows-[fit-content(100%)_1fr_1fr] h-full max-h-screen min-h-screen overflow-hidden'>
      <Header />
      {props.navigation}
      <ContentsLayout>{props.contents}</ContentsLayout>
    </div>
  )
}
