import React from 'react'

export default function PostsLayout(
  props: Readonly<{
    children: React.ReactNode
    navigation: React.ReactNode
    contents: React.ReactNode
  }>
) {
  return (
    <main className='min-h-full'>
      <div className='d-flex'>
        <div>{props.navigation}</div>
        <div>{props.children}</div>
        <div>{props.contents}</div>
      </div>
    </main>
  )
}
