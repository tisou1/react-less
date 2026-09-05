import * as path from 'node:path'
// import WindiCSS from 'vite-plugin-windicss'
// @ts-expect-error import
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(import.meta.dirname, 'src')}/`,
    },
  },
  plugins: [
    tailwindcss(), // atomic css
    react(),
    babel({ presets: [reactCompilerPreset()] }), // react compiler
    Pages(), // baesd files routing
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js ,.jsx
        /\.md$/, // .md
      ],

      imports: [
        'react',
        'react-router',
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
