const prettierPluginAstro = require.resolve('prettier-plugin-astro');
const prettierPluginTailwindcss = require.resolve('prettier-plugin-tailwindcss');

module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.astro/**',
    '**/.cache/**',
    '**/.tmp/**',
    'backend/public/**',
    'frontend/public/**',
    'backend/types/generated/**',
  ],
  overrides: [
    {
      files: ['backend/**/*.{js,ts}'],
      env: { node: true },
    },
    {
      files: ['*.cjs', '*.mjs', 'frontend/astro.config.mjs', 'frontend/postcss.config.cjs'],
      env: { node: true },
    },
    {
      files: ['frontend/**/*.{js,jsx,ts,tsx,astro}'],
      env: { browser: true },
      rules: {
        'sort-imports': 'off',
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^\\u0000'],
              ['^node:'],
              ['^@?\\w'],
              ['^@/(?!.*\\.astro$).+'],
              ['^@/.+\\.astro$'],
              [
                '^\\.\\.(?!/?$)(?!.*\\.astro$)',
                '^\\./(?=.*/)(?!/?$)(?!.*\\.astro$)',
                '^\\.(?!/?$)(?!.*\\.astro$)',
                '^\\./?$',
              ],
              ['^\\.{1,2}/.+\\.astro$'],
              ['^.+\\.s?css$'],
            ],
          },
        ],
        'simple-import-sort/exports': 'error',
        'no-restricted-syntax': [
          'error',
          {
            selector:
              "Property[key.type='Identifier'][key.name='link'][value.type='Literal'][value.value=/^\\/(?!$).+[^\\/]$/]",
            message: "Local 'link' values must end with a trailing slash (/). Use '/' for root.",
          },
          {
            selector:
              "JSXAttribute[name.name='href'][value.type='Literal'][value.value=/^\\/(?!$).+[^\\/]$/][value.value!=/\\.[a-zA-Z0-9]+$/]",
            message: "Local 'href' values must end with a trailing slash (/). Use '/' for root.",
          },
          {
            selector:
              "JSXAttribute[name.name='href'][value.type='JSXExpressionContainer'][value.expression.type='TemplateLiteral'][value.expression.quasis.0.value.raw=/^\\//][value.expression.quasis.1.value.raw!=/\\/$/][value.expression.quasis.1.value.raw!=/\\.[a-zA-Z0-9]+$/]",
            message: "Local template 'href' values must end with a trailing slash (/). Example: `/news/${slug}/`.",
          },
          {
            selector:
              "JSXAttribute[name.name=/^(class|className)$/][value.type='Literal'][value.value=/\\[[^\\]]+\\]/]",
            message:
              'Tailwind JIT arbitrary syntax is forbidden. Do not use arbitrary values/variants like h-[10px] or has-[...].',
          },
          {
            selector:
              "JSXAttribute[name.name=/^(class|className)$/][value.type='JSXExpressionContainer'][value.expression.type='TemplateLiteral'] TemplateElement[value.raw=/\\[[^\\]]+\\]/]",
            message:
              'Tailwind JIT arbitrary syntax is forbidden. Do not use arbitrary values/variants like h-[10px] or has-[...].',
          },
          {
            selector:
              "JSXAttribute[name.type='JSXNamespacedName'][name.namespace.name='class'][name.name.name='list'] Literal[value=/\\[[^\\]]+\\]/]",
            message:
              'Tailwind JIT arbitrary syntax is forbidden. Do not use arbitrary values/variants like h-[10px] or has-[...].',
          },
          {
            selector:
              "JSXAttribute[name.type='JSXNamespacedName'][name.namespace.name='class'][name.name.name='list'] TemplateElement[value.raw=/\\[[^\\]]+\\]/]",
            message:
              'Tailwind JIT arbitrary syntax is forbidden. Do not use arbitrary values/variants like h-[10px] or has-[...].',
          },
        ],
      },
    },
    {
      files: ['frontend/**/*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      plugins: ['astro', 'simple-import-sort'],
      extends: ['plugin:astro/recommended', 'plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'lf',
            printWidth: 120,
            singleQuote: true,
            trailingComma: 'all',
            bracketSpacing: true,
            singleAttributePerLine: true,
            tabWidth: 2,
            semi: true,
            parser: 'astro',
            plugins: [prettierPluginAstro, prettierPluginTailwindcss],
            tailwindConfig: './frontend/tailwind.config.ts',
          },
          {
            usePrettierrc: false,
          },
        ],
      },
    },
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'lf',
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
        singleAttributePerLine: true,
        tabWidth: 2,
        semi: true,
        plugins: [prettierPluginTailwindcss],
        tailwindConfig: './frontend/tailwind.config.ts',
      },
      {
        usePrettierrc: false,
      },
    ],
  },
};
