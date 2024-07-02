import React, { Children } from 'react'
import './mdx-styles.css'
import { useMDXComponents } from '@/mdx-components'

export default function PostsLayout(
  props: Readonly<{
    children: React.ReactNode
  }>
) {
  // TODO : SERISE (React Hooks, TypeScript Basics, etc.)
  // TODO : TAGS (JavaScript, TypeScript, React, Node.js, etc.)
  // TODO : Table of Contents
  // TODO : FRONT MATTER : title, description, date, author, etc. (SEO , METADATA) => layout.tsx로 설정

  const components = useMDXComponents()

  // Children.map(props.children, (child: any) => {
  // console.info('🚀 ~ Children.map ~ child:', child)
  // })

  console.log(
    '🚀 ~ file: layout.tsx ~ line 64 ~ PostsLayout ~ props.children',
    props
  )

  // create a table of contents using components variable

  return (
    <main className='min-h-full'>
      <nav></nav>
      {/* table of contents */}
      <div id='mdx-contents'>{props.children}</div>
      {/* next, prev post */}
    </main>
  )
}
