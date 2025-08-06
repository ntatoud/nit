// @ts-check

/** @type {import("prettier").Options} */
const config = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  arrowParens: 'always',

  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  // Define sorting rules depending on the project.
};

export default config;
