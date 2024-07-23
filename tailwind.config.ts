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
  ],
  theme: {
    // 1rem => 10px로 적용됩니다.
    // hi_melody 폰트가 원래 좀 작습니다.
    fontSize: {
      xs: "1.5rem",
      sm: "1.75rem",
      base: "2rem",
      lg: "2.5rem",
      xl: "2.75rem",
      "2xl": "3rem",
      "3xl": "3.5rem",
      "4xl": "3.75rem",
      "5xl": "4rem",
      "6xl": "4.5rem",
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

const UTILITY_STYLES = {
  ".global-layout": {
    "grid-column": "span 4 / start 2",
    "grid-row": "span 2 / start 2",
    overflow: "hidden",
    "background-color": "#ebf8fc", // bg-slate-50
    height: "100%",
  },
}

export default config
