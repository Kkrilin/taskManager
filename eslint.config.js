import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      // ✅ Copying Google's main rules (without deprecated ones)
      'require-jsdoc': 'off', // 🚀 Fixing your error
      'valid-jsdoc': 'off', // 🚀 Prevent previous error

      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      indent: ['error', 2],
      'max-len': ['error', { code: 120 }],
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'warn',
      // 'no-console': 'warn',
      'arrow-parens': ['error', 'always'],
    },
  },
];
