import { Config } from 'tailwindcss'

/**
 * @note 재정의시 명시되지 않은 기본 값은 재거됩니다. **기본값을 쓰면서 수정이 필요하다면** 아래 링크를 참고해주세요.
 * @link https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/mdx-components.tsx',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // 1rem => 10px로 적용됩니다.
    // hi_melody 폰트가 원래 좀 작습니다.
    fontSize: {
      xs: '1.5rem',
      sm: '1.75rem',
      base: '2rem',
      lg: '2.5rem',
      xl: '2.75rem',
      '2xl': '3rem',
      '3xl': '3.5rem',
      '4xl': '3.75rem',
      '5xl': '4rem',
      '6xl': '4.5rem',
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
