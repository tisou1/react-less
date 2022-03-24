import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '~/':`${path.resolve(__dirname,'src')}/`
    }
  },
  plugins: [
    react(),
    Pages(),  //baesd files routing
    WindiCSS(), //atomic css
    AutoImport({
      include: [
        /\.[tj]sx?$/, //.ts, .tsx, .js ,.jsx
        /\.md$/,//.md
      ],

      imports: [
        'react',
        'react-router-dom'
        // { 预设里面已经包括了useState useEffect....
        //https://github.com/antfu/unplugin-auto-import/blob/main/src/presets/react.ts
        //   'react' :[
        //     'useState',
        //     'useEffect',
        //     ['useRef', 'useMyRef'], //使用别名
        //   ]
        // }
      ],
      dts: './src/auto-imports.d.ts', //ts类型声明
    }), //auto import
  ]
})
