// @ts-check
const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    ignores: [
      // eslint ignore globs here
    ],
  },
  {
    rules: {
      // overrides
      'ts/no-namespace': 'off',
      'ts/ban-ts-comment': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
)
