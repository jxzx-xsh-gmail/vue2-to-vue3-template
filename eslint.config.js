import eslint from '@eslint/js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import eslintPluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import autoImport from './.eslintrc-auto-import.json' with { type: 'json' }

export default tsEslint.config(
  {
    ignores: ['node_modules', 'dist', 'public'],
  } /** JS 推荐配置 */,
  eslint.configs.recommended /** TS 推荐配置 */,
  ...tsEslint.configs.recommended /** Vue 推荐配置 */,
  ...eslintPluginVue.configs['flat/recommended'] /** Stylistic 自定义规则 */,
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
    braceStyle: '1tbs',
    arrowParens: 'always',
  }) /**
   * JavaScript 规则
   */,
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }], // 允许 console.warn 和 console.error
      // 关闭 this 别名的规则
      '@typescript-eslint/no-this-alias': 'off',
    },
  } /**
   * 配置全局变量
   */,
  {
    languageOptions: {
      globals: {
        ...globals.browser /** 追加一些其他自定义全局规则 */,
        Buffer: true,
        CONFIG_VALUE: true,
        OSS: true,
        ...autoImport.globals,
      },
    },
  } /**
   * Vue 规则
   */,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        /** TypeScript 项目需要用到这个 */
        parser: tsEslint.parser,
        ecmaVersion: 'latest' /** 允许在 .vue 文件中使用 JSX */,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 在这里追加 Vue 规则
      'vue/no-mutating-props': [
        'error',
        {
          shallowOnly: true,
        },
      ],
      // 关闭组件名必须多单词的规则
      'vue/multi-word-component-names': 'off',
      // 关闭组件名必须驼峰的规则
      'vue/component-definition-name-casing': 'off',
      // 关闭默认 prop 必须有默认值的规则
      'vue/require-default-prop': 'off',
    },
  } /**
   * TypeScript 规则
   */,
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      // 这里可以添加 TypeScript 相关的规则
      // 关闭 any 类型的规则
      '@typescript-eslint/no-explicit-any': 'off',
    },
  } /**
   * Prettier 配置
   * 会合并根目录下的 .prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */,
  eslintPluginPrettierRecommended,
)
