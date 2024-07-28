import { Inter, Hi_Melody, Roboto_Mono } from "next/font/google"
import localFont from "next/font/local"

/**
 * @description 서브 폰트입니다.
 */
export const subFont = Inter({ subsets: ["latin"] })

// export const mainFont = Hi_Melody({
//   subsets: ["latin"],
//   weight: ["400"],
//   style: ["normal"],
// })
/**
 * @description 메인 폰트입니다.
 */
export const mainFont = localFont({
  src: [
    {
      path: "../../public/cookie/cookie_regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/cookie/cookie_medium.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/cookie/cookie_bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
})

/**
 * @description 코드 블록 폰트입니다.
 */
export const codeFont = Roboto_Mono({ subsets: ["latin"] })
