import './mdx-styles.css'

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className='min-h-full'>
      <div id='mdx-contents'>{children}</div>
    </main>
  )
}
