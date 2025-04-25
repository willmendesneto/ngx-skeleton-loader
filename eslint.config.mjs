import { defineConfig } from 'eslint/config';
import angular from 'angular-eslint';

export default defineConfig([
  {
    files: ['**/*.ts'],

    processor: angular.processInlineTemplates,

    extends: [
      angular.configs.tsRecommended,
    ],

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
          prefix: 'ngx',
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
    extends: [
      angular.configs.templateRecommended
    ],
    rules: {},
  },
  {
    files: ['**/*.spec.ts'],

    processor: angular.processInlineTemplates,

    extends: [
      angular.configs.tsRecommended,
    ],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: ['tsconfig.json', 'e2e/tsconfig.json'],
        createDefaultProgram: true,
      },
    },

    rules: {
      '@angular-eslint/prefer-standalone': "off",
    },
  },
]);
