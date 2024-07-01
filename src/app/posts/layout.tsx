import './mdx-styles.css'

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // TODO : SERISE (React Hooks, TypeScript Basics, etc.)
  // TODO : TAGS (JavaScript, TypeScript, React, Node.js, etc.)
  // TODO : Table of Contents
  // TODO : FRONT MATTER : title, description, date, author, etc. (SEO , METADATA) => layout.tsx로 설정

  return (
    <main className='min-h-full'>
      <nav></nav>
      {/* table of contents */}
      <div id='mdx-contents'>{children}</div>
      {/* next, prev post */}
    </main>
  )
}
