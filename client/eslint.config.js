import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended, // Enables recommended ESLint rules
  {
    plugins: {
      prettier: pluginPrettier, // Adds Prettier as an ESLint plugin
    },
    rules: {
      'prettier/prettier': 'error', // Show Prettier formatting issues as ESLint errors
      'no-unused-vars': 'warn', // Warn about unused variables
      eqeqeq: 'error', // Enforce strict equality (===)
      curly: 'error', // Require curly braces for all blocks
    },
  },
  configPrettier, // Disables ESLint rules that conflict with Prettier
];
