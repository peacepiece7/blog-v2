import type { Metadata } from 'next'
import { hiMelody, inter } from '@/utils/fonts'
import './styles/globals.css'
import './styles/reset.css'
import { LeftSideBar } from '@/components/navigation/LeftSideBar'
import { headers } from 'next/headers'
import { X_CUSTOM_URL } from '@/constants/server'
import { PostPageLayout } from '@/components/layout/PostPageLayout'
import { MainPageLayout } from '@/components/layout/MainPageLayout'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  keywords: 'Next.js, TypeScript, Tailwind CSS',
  creator: 'Your Name',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerList = headers()
  const isPostPage = headerList.get(X_CUSTOM_URL)?.includes('posts')

  headerList.forEach((value, key) => {
    console.log(key, value)
  })

  // fetch('http://localhost:3000/api/navigation')
  // const tocRes = await fetch('/api/table-of-contents')

  // get navigation data
  // get table of contents data

  return (
    <html lang='en'>
      <body className={`${hiMelody?.className} ${inter?.className} text-base`}>
        <div className='grid grid-cols-[fit-content(100%)_1fr_1fr] grid-rows-[fit-content(100%)_1fr_1fr] h-full max-h-screen min-h-screen overflow-hidden'>
          <div className='col-start-1 col-end-5 row-start-1 row-end-2'>
            <Link href='/'>Blog v2</Link>
          </div>
          <div className='col-start-1 col-end-2 row-start-2 row-end-4 w-fit min-w-fit px-10 overflow-y-scroll'>
            {/* left side bar skeleton UI */}
            <LeftSideBar />
          </div>
          {isPostPage ? (
            <PostPageLayout>{children}</PostPageLayout>
          ) : (
            <MainPageLayout>{children}</MainPageLayout>
          )}
        </div>
      </body>
    </html>
  )
}
