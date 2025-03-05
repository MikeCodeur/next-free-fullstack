import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {FlatCompat} from '@eslint/eslintrc'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import github from 'eslint-plugin-github'
import jsonFormat from 'eslint-plugin-json-format'
import unicorn from 'eslint-plugin-unicorn'
import promise from 'eslint-plugin-promise'
import drizzle from 'eslint-plugin-drizzle'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const eslintConfig = [
  {
    ignores: ['src/components/ui/*', '**/dist/**'],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'eslint:recommended',
    'plugin:react/recommended'
  ),
  {
    plugins: {
      prettier: prettier,
      '@typescript-eslint': typescriptEslint,
      react,
      github,
      'json-format': jsonFormat,
      unicorn,
      promise,
      drizzle,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'import/no-commonjs': 'off',
      'import/no-namespace': 'off',
      'import/named': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': 'off',
      'no-console': 'off',
      'no-unused-vars': 'off',
      'promise/always-return': 'error',
      'promise/no-return-wrap': 'error',
      'promise/param-names': 'error',
      'promise/catch-or-return': 'error',
      'promise/no-native': 'off',
      'promise/no-nesting': 'warn',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'warn',
      'promise/valid-params': 'warn',
      'promise/avoid-new': 'off',
      'react/prop-types': 'off',
      'i18n-text/no-en': 'off',
      'react/react-in-jsx-scope': 'off',
      'github/no-implicit-buggy-globals': 'off',
    },
  },
]

export default eslintConfig
