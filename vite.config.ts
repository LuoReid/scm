import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// import eslint from '@rollup/plugin-eslint'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ElementPlus from 'unplugin-element-plus/vite'

import { svgBuilder } from './src/plugins/svgBuilder'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

import { viteMockServe } from 'vite-plugin-mock'

const pathResolve = function (dir: string) {
  return resolve(process.cwd(), '.', dir)
  // return path.join(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  console.log('config:', root, env, mode, process.platform)
  return defineConfig({
    root: process.cwd(),
    base: './',
    define: { 'process.env': {} },
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
      // eslint(),
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
      createStyleImportPlugin({
        resolves: [
          // 按需加载element-plus
          ElementPlusResolve()
        ],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`
            },
          },
        ]
      }),
      viteMockServe({
        mockPath: 'mock',
        watchFiles: true,
        supportTs: true,
        localEnabled: command === 'serve',
        prodEnabled: false,
        injectCode: `import {setupProdMockServer} from './mockProdServer; setupProdMockServer();`,
        logger: false
      })
    ],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
}
