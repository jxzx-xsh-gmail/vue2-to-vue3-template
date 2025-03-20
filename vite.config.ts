import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const pathSrc = path.resolve(__dirname, 'src')
  return {
    plugins: [
      vue(),
      AutoImport({
        // eslint报错解决
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
        dts: 'auto-imports.d.ts', // 生成 `auto-imports.d.ts` 全局声明
      }),
      Components({
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 配置 @ 指向 src 目录’'@some-library': path.resolve(__dirname, 'node_modules/some-library/src')
        '@node_modules': path.resolve(__dirname, 'node_modules'),
      },
    },
    define: {
      CONFIG_VALUE: env.CONFIG_TYPE,
    },
  }
})
