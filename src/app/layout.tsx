import type { Metadata } from 'next'
import { hiMelody, inter } from '@/utils/server'
import './styles/globals.css'
import './styles/reset.css'

export const metadata: Metadata = {
  title: '블로그',
  description: '블로그입니다.',
  keywords: '프론트 엔드',
  creator: 'peacepiece7',
}

// app-index.js:33 Warning: Extra attributes from the server: monica-locale
// https://manystory.tistory.com/entry/Warning-Extra-attributes-from-the-server-monica-localemonica-versionmonica-id

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
