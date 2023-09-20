/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: './',
  },
  globals: {
    google: 'readonly',
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  settings: {
    'import/core-modules': ['svelte', 'svelte/motion'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.cjs', '.js', '.ts'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.eslint.json', './.svelte-kit/tsconfig.json'],
      },
    },
  },
  plugins: [],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    // 'airbnb-base',
    // 'airbnb-typescript/base',
    'plugin:svelte/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'import/prefer-default-export': 'off',

    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        fixStyle: 'inline-type-imports',
      },
    ],

    // disable rules for '_'
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/naming-convention': [
      'off',
      {
        selector: 'variable',
        format: null,
        custom: {
          regex: '^_$',
          match: false,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
};
