/* eslint-disable sonarjs/no-nested-template-literals */
/**
 * @see https://nextjs.org/docs/app/api-reference/config/eslint#running-lint-on-staged-files
 */

import { relative } from "node:path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${relative(process.cwd(), f)}"`).join(" ")}`;

/**
 * @see https://github.com/lint-staged/lint-staged?tab=readme-ov-file#configuration
 * @type {import('lint-staged').Configuration}
 */
const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"],
  "*.{ts,tsx}": () => ["tsc --noEmit"],
  "**/*": "secretlint",
};

export default config;
