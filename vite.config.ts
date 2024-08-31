import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        // additionalData: `@use "@/styles/index.scss";`,
      },
    },
    postcss: {
      plugins: [
        // postCssPxToRem({
        //   rootValue: 90, // 75表示750设计稿，37.5表示375设计稿
        //   propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        //   selectorBlackList: [
        //     '#app-wrap'
        //   ] // 要忽略并保留为px的选择器
        // })
      ]
    }
  },
})
