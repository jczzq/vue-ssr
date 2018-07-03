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
      // 函数定义时括号前的空格
      "space-before-function-paren": [0, {"anonymous": "always", "named": "never"}]
  },
  globals: {
    M: true,
    flvjs: true
  }
}
