import { defineConfig } from 'eslint/config';
import angular from 'angular-eslint';

export default defineConfig([
  {
    // Global ignores (an object with `ignores` only), applied to every file type
    ignores: ['coverage/**', 'dist/**', 'projects/*/coverage/**'],
  },
  {
    files: ['**/*.ts'],

    processor: angular.processInlineTemplates,

    extends: [angular.configs.tsRecommended],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    rules: {
      'no-console': ['error'],
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: ['ngx', 'app'],
          style: 'kebab-case',
          type: 'element',
        },
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'ngx',
          style: 'camelCase',
          type: 'attribute',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    ignores: ['./coverage/**', './dist/*', './projects/*/coverage/**'],
    extends: [angular.configs.templateRecommended],
    rules: {},
  },
  {
    files: ['**/*.spec.ts'],

    processor: angular.processInlineTemplates,

    extends: [angular.configs.tsRecommended],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    rules: {
      '@angular-eslint/prefer-standalone': 'off',
    },
  },
]);
