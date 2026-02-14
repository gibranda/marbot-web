import eslintPluginTanstackQuery from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginSecurity from "eslint-plugin-security";
import eslintPluginSonarJS from "eslint-plugin-sonarjs";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  // --- SonarJS Rules ---
  eslintPluginSonarJS.configs.recommended,
  // --- Security Rules ---
  eslintPluginSecurity.configs.recommended,
  // --- Tanstack Query Rules ---
  ...eslintPluginTanstackQuery.configs["flat/recommended"],
  // Override default ignores of eslint-config-next.
  {
    plugins: {
      import: eslintPluginImport,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "react/no-array-index-key": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        {
          props: "never",
          children: "never",
        },
      ],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-redeclare": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "sonarjs/no-commented-code": "off",
      "no-console": ["warn", { allow: ["debug", "error"] }],
      "import/no-named-as-default": 0,
      "import/no-cycle": ["error"],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
