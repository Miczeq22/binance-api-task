// @ts-check

import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: [
      'src/building-blocks/infrastructure/ephemeris/ephemeris.script.js',
      'src/types.d.ts',
      'tools/.folder-templates',
      'eslint.config.mjs',
      'src/building-blocks/infrastructure/mailer/templates/*.ts',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  // @ts-ignore - ignore this type error
  eslintConfigPrettier,
  {
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-invalid-void-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-extraneous-class': [
        'error',
        {
          allowStaticOnly: true,
        },
      ],
    },
  },
);
