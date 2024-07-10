import type { Metadata } from 'next'
import { hiMelody, inter } from '@/utils/fonts'
import './styles/globals.css'
import './styles/reset.css'
import Link from 'next/link'
import { ContentsLayout } from '@/components/layout/Layout'
import { LeftSideBar } from '@/components/navigation/LeftSideBar'

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
  return (
    <html lang='en'>
      <body className={`${hiMelody?.className} ${inter?.className} text-base`}>
        {/* <div className='grid grid-cols-[fit-content(100%)_1fr_1fr] grid-rows-[fit-content(100%)_1fr_1fr] h-full max-h-screen min-h-screen overflow-hidden'>
          <div className='col-start-1 col-end-5 row-start-1 row-end-2'>
            <Link href='/'>Blog v2</Link>
          </div>
          <div className='col-start-1 col-end-2 row-start-2 row-end-4 w-fit min-w-fit max-w-[50rem] px-10 overflow-y-scroll'>
            <LeftSideBar />
          </div> */}
        {children}
        {/* </div> */}
      </body>
    </html>
  )
}
