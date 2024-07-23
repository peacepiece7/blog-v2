import { CSSRuleObject, RecursiveKeyValuePair } from "tailwindcss/types/config"

interface IUtilityStyles {
  [key: string]: CSSRuleObject
}

export const UTILITY_STYLES: IUtilityStyles = {
  ".global-layout": {
    "grid-column": "span 4 / start 2",
    "grid-row": "span 2 / start 2",
    padding: "3.75rem",
    overflow: "hidden",
    "background-color": "#ebf8ff",
  },
}
