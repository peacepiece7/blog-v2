import { Inter, Hi_Melody } from 'next/font/google'
/**
 * @description 서브 폰트입니다.
 */
export const inter = Inter({ subsets: ['latin'] })
/**
 * @description 메인 폰트입니다.
 */
export const hiMelody = Hi_Melody({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
})
