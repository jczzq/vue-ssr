module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'comma-dangle': 0,
    // 2个空格缩进
    indent: ['error', 2, { SwitchCase: 1 }],
    // 分号
    semi: ['error', 'always'],
    // 形参可定义不使用
    'no-unused-vars': [
        'error',
        { vars: 'all', args: 'none', ignoreRestSiblings: false }
    ],
    // 函数声明
    'space-before-function-paren': [
        'error',
        { anonymous: 'never', named: 'never', asyncArrow: 'always' }
    ],
    'no-new': 0,
    'standard/computed-property-even-spacing': [2, 'never'],
    'standard/no-callback-literal': [2, 'never'],
    'prefer-promise-reject-errors': 'off',
    'import/first': 'off',
    'no-useless-return': 'off'
  },
  globals: {}
}
