module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: 'airbnb-base',
  rules: {
    'no-console': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'arrow-body-style': ['error', 'always']
  }
};
