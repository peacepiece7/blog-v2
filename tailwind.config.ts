import { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

/**
 * @note 재정의시 명시되지 않은 기본 값은 재거됩니다. **기본값을 쓰면서 수정이 필요하다면** 아래 링크를 참고해주세요.
 * @link https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/mdx-components.tsx",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // 1rem => 10px로 적용됩니다.
    // hi_melody 폰트가 원래 좀 작습니다.
    fontSize: {
      xs: "1rem",
      sm: "1.25rem",
      base: "1.5rem",
      lg: "2rem",
      xl: "2.2em",
      "2xl": "2.5rem",
      "3xl": "2.7rem",
      "4xl": "3rem",
      "5xl": "3.4rem",
      "6xl": "4rem",
    },
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities, addBase, config }) {
      addUtilities(UTILITY_STYLES)
      // base styles
      // https://v1.tailwindcss.com/docs/plugins#adding-base-styles
      // addBase({ h1: config("theme.fontSize.4xl") })

      // media-query
      // https://v1.tailwindcss.com/docs/plugins#referencing-the-user-s-config

      // gradient color (default variants)
      // https://v1.tailwindcss.com/docs/plugins#providing-default-options

      // add compnents media-query
      // https://v1.tailwindcss.com/docs/plugins#css-in-js-syntax
    }),
  ],
}
// col-start-2 col-end-5 row-start-2 row-end-4 p-14 overflow-hidden bg-blue-50;
const UTILITY_STYLES = {
  ".global-layout": {
    "grid-column-start": "2",
    "grid-column-end": "5",
    "grid-row-start": "2",
    "grid-row-end": "4",
    "background-color": "#ebf8fc", // bg-slate-50
    overflow: "hidden",
    padding: "3rem",
    height: "100%",
  },
  ".link": {}, // intellisense 때문에 global.css에서 오버라이드
  ".btn-common": {}, // intellisense 때문에 global.css에서 오버라이드
  ".text-clickable": {}, // intellisense 때문에 global.css에서 오버라이드
}

export default config
