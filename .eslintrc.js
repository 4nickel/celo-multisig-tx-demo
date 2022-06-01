module.exports = {
  env: {
    browser: false,
    es2021: true,
    jest: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'import/export': 'off',
    'dot-notation': 'off',
    'import/no-named-as-default-member': 'off',
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        args: 'none',
        varsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: '.',
      },
    },
  },
};
