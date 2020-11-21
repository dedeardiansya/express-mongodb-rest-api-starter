module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'func-names': 'off',
    'consistent-return': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
  },
}
