import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{ts}'] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  { rules: { '@typescript-eslint/no-explicit-any': 'off' } },
];