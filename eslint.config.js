// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

const unusedImports = require("eslint-plugin-unused-imports");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
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
        "warn",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "warn",
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
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      "unused-imports/no-unused-imports": "warn",
    },
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
    },
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslintPluginPrettierRecommended,
    ],
  },
  eslintConfigPrettier,
);
