const prettierPluginAstro = require.resolve('prettier-plugin-astro');
const prettierPluginTailwindcss = require.resolve('prettier-plugin-tailwindcss');

const PERFECTIONIST_NATURAL_SORT = {
  order: 'asc',
  type: 'natural',
};

const CODE_STYLE_RESTRICTED_SYNTAX = [
  {
    selector: 'IfStatement[consequent.type="ExpressionStatement"]',
    message: 'Для тела if с выражением обязательны фигурные скобки.',
  },
  {
    selector: 'IfStatement[alternate.type="ExpressionStatement"]',
    message: 'Для тела else с выражением обязательны фигурные скобки.',
  },
  {
    selector:
      'CallExpression[callee.type="Identifier"][callee.name=/^(ref|reactive|computed|shallowRef)$/]:not([typeArguments])',
    message: 'Для реактивного состояния явно укажите тип через generic-параметр.',
  },
];

module.exports = {
  root: true,
  env: {
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'perfectionist', 'simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.astro/**',
    '**/.cache/**',
    '**/.tmp/**',
    'output/alfa-dev/**',
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
      files: ['backend/src/contracts/**/*.schemas.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: '@/contracts',
                message:
                  'Runtime schemas must use direct imports instead of barrel imports to avoid ESM initialization order bugs.',
              },
              {
                name: '@contracts',
                message:
                  'Runtime schemas must use direct imports instead of barrel imports to avoid ESM initialization order bugs.',
              },
              ...[
                '../shared',
                '../shared/index',
                '../../shared',
                '../../shared/index',
                '../../../shared',
                '../../../shared/index',
                '../pages',
                '../pages/index',
                '../../pages',
                '../../pages/index',
                '../../../pages',
                '../../../pages/index',
              ].map((name) => ({
                name,
                message:
                  'Runtime schemas must use direct imports instead of barrel imports to avoid ESM initialization order bugs.',
              })),
            ],
            patterns: [
              {
                group: ['@/contracts', '@contracts'],
                message:
                  'Runtime schemas must use direct imports instead of barrel imports to avoid ESM initialization order bugs.',
              },
            ],
          },
        ],
      },
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
        'no-restricted-syntax': [
          'error',
          ...CODE_STYLE_RESTRICTED_SYNTAX,
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
      files: ['frontend/**/*.vue'],
      env: { browser: true },
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['vue', '@typescript-eslint', 'perfectionist', 'simple-import-sort'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
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
        'vue/define-emits-declaration': ['error', 'type-literal'],
        'vue/html-self-closing': [
          'error',
          {
            html: { component: 'always', normal: 'always', void: 'always' },
            math: 'always',
            svg: 'always',
          },
        ],
        'vue/multi-word-component-names': 'error',
        'vue/no-restricted-syntax': [
          'error',
          {
            selector:
              'VAttribute[directive=true][key.name.name="on"] > VExpressionContainer[expression.type!="Identifier"][expression.type!="MemberExpression"]',
            message: 'Для обработчиков событий используйте ссылки на именованные методы.',
          },
        ],
        'vue/v-bind-style': ['error', 'shorthand', { sameNameShorthand: 'always' }],
      },
    },
    {
      files: ['frontend/**/*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      plugins: ['astro', 'perfectionist', 'simple-import-sort'],
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
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I'],
        filter: { regex: '^(Props|Window|ImportMeta|ImportMetaEnv)$', match: false },
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
        prefix: ['T'],
        filter: { regex: '^(MaybeArray|CSSStyleDeclarationOptional|CSSClassDeclaration|VNodeArray)$', match: false },
      },
    ],
    'func-style': ['error', 'declaration'],
    'no-restricted-syntax': ['error', ...CODE_STYLE_RESTRICTED_SYNTAX],
    'perfectionist/sort-enums': ['error', PERFECTIONIST_NATURAL_SORT],
    'perfectionist/sort-exports': ['error', PERFECTIONIST_NATURAL_SORT],
    'perfectionist/sort-interfaces': ['error', PERFECTIONIST_NATURAL_SORT],
    'perfectionist/sort-intersection-types': ['error', PERFECTIONIST_NATURAL_SORT],
    'perfectionist/sort-named-exports': ['error', PERFECTIONIST_NATURAL_SORT],
    'perfectionist/sort-named-imports': ['error', PERFECTIONIST_NATURAL_SORT],
    'perfectionist/sort-object-types': ['error', PERFECTIONIST_NATURAL_SORT],
    'perfectionist/sort-union-types': ['error', PERFECTIONIST_NATURAL_SORT],
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
