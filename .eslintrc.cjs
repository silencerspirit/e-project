module.exports = {
  root: true,
  env: {
    es2022: true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.astro/**",
    "**/.cache/**",
    "**/.tmp/**",
    "backend/public/**",
    "frontend/public/**",
    "backend/types/generated/**"
  ],
  overrides: [
    {
      files: ["backend/**/*.{js,ts}"],
      env: { node: true }
    },
    {
      files: ["frontend/**/*.{js,ts,astro}"],
      env: { browser: true }
    },
    {
      files: ["frontend/**/*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"]
      },
      plugins: ["astro"],
      extends: ["plugin:astro/recommended", "plugin:prettier/recommended"],
      rules: {
        "prettier/prettier": [
          "error",
          {
            endOfLine: "lf",
            printWidth: 120,
            singleQuote: true,
            trailingComma: "all",
            bracketSpacing: true,
            singleAttributePerLine: true,
            tabWidth: 2,
            semi: true,
            parser: "astro",
            plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
            tailwindConfig: "./frontend/tailwind.config.ts"
          }
        ]
      }
    }
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "lf",
        printWidth: 120,
        singleQuote: true,
        trailingComma: "all",
        bracketSpacing: true,
        singleAttributePerLine: true,
        tabWidth: 2,
        semi: true,
        plugins: ["prettier-plugin-tailwindcss"],
        tailwindConfig: "./frontend/tailwind.config.ts"
      }
    ]
  }
};
