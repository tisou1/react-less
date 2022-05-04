import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Pages from 'vite-plugin-pages'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    react(),
    Pages(), // baesd files routing
    WindiCSS(), // atomic css
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js ,.jsx
        /\.md$/, // .md
      ],

      imports: [
        'react',
        'react-router-dom',
        {
          'react-i18next': [
            'useTranslation',
          ],
        },
      ],
      dts: './src/auto-imports.d.ts', // ts类型声明
    }), // auto import
  ],
})
