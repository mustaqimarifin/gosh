import typo from "@tailwindcss/typography"
import type { Config } from "tailwindcss"

const config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.mdx",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--kaisei)"],
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typo],
} satisfies Config

export default config
