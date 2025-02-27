/**
 * @type {import("prettier").Config}
 */
const config = {
  tabWidth: 2,
  semi: false,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
}

module.exports = config
