// prettier.config.js
/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 */
export default {
  // 使用所有可能的尾随逗号
  trailingComma: 'all',
  // 使用单引号而不是双引号
  singleQuote: true,
  // 不使用分号
  semi: false,
  // 每行打印的最大宽度
  printWidth: 200,
  // 箭头函数参数必须有括号
  arrowParens: 'always',
  // 包装散文时始终使用新行
  proseWrap: 'always',
  // 换行符始终使用LF
  endOfLine: 'lf',
  // 不使用实验性三元表达式
  experimentalTernaries: false,
  // 制表符宽度为2个空格
  tabWidth: 2,
  // 不使用制表符，使用空格
  useTabs: false,
  // 对象属性的引号风格保持一致
  quoteProps: 'consistent',
  // 在JSX中不使用单引号
  jsxSingleQuote: false,
  // 在方括号周围使用空格
  bracketSpacing: true,
  // 不在方括号同一行结束
  bracketSameLine: false,
  // 在JSX标签中不在同一行结束括号
  jsxBracketSameLine: false,
  // 在Vue中不单独缩进<script>和<style>标签
  vueIndentScriptAndStyle: false,
  // 每个属性单独一行
  singleAttributePerLine: false,
}
