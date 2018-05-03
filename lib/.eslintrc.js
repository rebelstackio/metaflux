module.exports = {
    extends: require.resolve('eslint-config-airbnb-base'),
    parserOptions: {
        "ecmaVersion": 6,
    },
    env: {
        "node": true
    },
    rules: {
        "semi": ["error", "always"],
        "standard/object-curly-even-spacing": false,
        "no-multi-spaces": 0,
        'indent': ['error', 'tab', { "SwitchCase": 1 }],
        'prefer-destructuring':0,
        'import/no-unresolved':0,
        'import/no-extraneous-dependencies':0,
        'comma-dangle':0,
        'no-underscore-dangle':0,
        'no-bitwise':0,
        'no-multi-assign':0,
        'no-restricted-syntax':0,
        'guard-for-in':0,
        'no-tabs': 0,
        'no-restricted-properties':0,
        'guard-for-in':0,
        'no-tabs': 0,
        'no-eval': 0
    }
};