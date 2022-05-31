import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

import { svgBuilder } from './src/plugins/svgBuilder'

const pathResolve = function (dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: './',
  resolve: {
    alias: { '@': pathResolve('src') }
  },

  css: {
    // postcss : {
    //   plugins : [require( 'autoprefixer' )]
    // },
    preprocessorOptions: {
      scss: {
        // 引入 var.scss 这样就可以在全局中使用 var.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        // additionalData: '@import "./src/styles/variables.scss";'
      }
    }
  },
  plugins: [
    vue({}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: ["src/components"],
      deep: true,
      dts: "src/components/components.d.ts",
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      directoryAsNamespace: true
    }),
    ElementPlus(),
    svgBuilder('./src/icons/svg/'), // 全量导入svg
  ]
})
