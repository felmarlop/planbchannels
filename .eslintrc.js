/*
  ESLint statically analyzes your code to quickly find problems.
  ESLint is built into most text editors and you can run ESLint as
  part of your continuous integration pipeline.

  Many problems ESLint finds can be automatically fixed.

*/

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020
  },
  plugins: ['import', 'simple-import-sort', 'sort-exports', 'sort-destructure-keys'],
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'comma-dangle': ['error', 'never'],
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_', args: 'all' }],

    // Vue specific
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': ['warn', { ignorePattern: '^_' }],
    'vue/require-prop-type-constructor': 'error',
    'vue/require-default-prop': 'error',
    'vue/prop-name-casing': 'error',
    'vue/order-in-components': 'error',
    'vue/custom-event-name-casing': ['error', { ignores: ['/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u'] }],
    'vue/no-use-v-if-with-v-for': ['error', { allowUsingIterationVar: true }],
    'vue/attributes-order': [
      'warn',
      {
        order: [
          ['DEFINITION', 'UNIQUE', 'GLOBAL'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          ['LIST_RENDERING', 'RENDER_MODIFIERS', 'CONTENT', 'CONDITIONALS']
        ],
        alphabetical: false
      }
    ]
  }
}
