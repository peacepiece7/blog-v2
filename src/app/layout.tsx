import type { Metadata } from 'next'
import { hiMelody, inter } from '@/utils/fonts'
import './styles/globals.css'
import './styles/reset.css'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  keywords: 'Next.js, TypeScript, Tailwind CSS',
  creator: 'Your Name',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${hiMelody?.className} ${inter?.className} text-base`}>
        {children}
      </body>
    </html>
  )
}
