const tw = import("prettier-plugin-tailwindcss")
const sort = import("@ianvs/prettier-plugin-sort-imports")

const config = {
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/env(.*)$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
  plugins: [sort, tw],
}

export default config

/* // Classic string literals

// A variable
const path = './myOtherModule.js';
const module2 = await import(path);

// Function call
const getPath = (version) => `./myModule/versions/${version}.js`;
const moduleVersion1 = await import(getPath('v1.0'));
const moduleVersion2 = await import(getPath('v2.0')); */
