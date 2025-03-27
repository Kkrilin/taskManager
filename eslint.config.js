import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['node_modules/', 'dist/'], // Ignore these directories
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      js,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules, // Use recommended JS rules
      'prettier/prettier': 'error', // Run Prettier as an ESLint rule
      // quotes: ['error', 'single'], // Enforce single quotes
      // semi: ['error', 'always'], // Enforce semicolons
    },
    extends: [prettierConfig], // Disable ESLint rules that conflict with Prettier
  },
]);
