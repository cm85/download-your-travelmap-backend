module.exports = {
  extends: 'airbnb',
  rules: {
    'no-param-reassign': ['error', { props: false }],
  },
  env: {
    jest: true,
  },
};
