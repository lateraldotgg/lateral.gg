/**
 * @see https://prettier.io/docs/configuration
 * @see https://www.nikolailehbr.ink/blog/tailwindcss-v3-tips#automatic-wrapping-of-long-class-names
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-classnames", "prettier-plugin-merge"],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 80,
};

module.exports = config;
