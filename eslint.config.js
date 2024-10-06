// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

const importPlugin = require('eslint-plugin-import');

const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const eslintConfigPrettier = require("eslint-config-prettier");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    files: ["**/*.ts"],
    extends: [
      importPlugin.flatConfigs.recommended,
    ],
    rules: {
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          "alphabetize": {
            order: "asc",
          },
        },
      ],
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslintPluginPrettierRecommended
    ],
  },
  eslintConfigPrettier,
  {
    files: ["**/*.ts"],
    rules: {
      "prettier/prettier": [
        "warn",
        {
          endOfLine: "auto"
        }
      ],
    },
  }
);
