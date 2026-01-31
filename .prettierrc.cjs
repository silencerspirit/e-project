module.exports = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  singleAttributePerLine: true,
  tabWidth: 2,
  semi: true,
  endOfLine: "lf",
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  tailwindConfig: "./frontend/tailwind.config.ts"
};
