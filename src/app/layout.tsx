import type { Metadata } from "next"
import { mainFont, subFont } from "@/utils/shared"
import "./global.css"

export const metadata: Metadata = {
  title: "블로그",
  description: "블로그입니다.",
  keywords: "프론트 엔드",
  creator: "peacepiece7",
}

// app-index.js:33 Warning: Extra attributes from the server: monica-locale
// https://manystory.tistory.com/entry/Warning-Extra-attributes-from-the-server-monica-localemonica-versionmonica-id

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainFont?.className} ${subFont?.className} text-base`}
      >
        {children}
      </body>
    </html>
  )
}
