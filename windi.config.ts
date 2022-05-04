import { defineConfig } from 'windicss/helpers'
// import colors from 'windicss/colors'

export default defineConfig({
  /* 配置项... */
  darkMode: 'class', // or 'media'
  attributify: true,
  theme: {
    extend: {
      spacing: {
        siry: '33px',
      },
      colors: {
        ddd: '#00ff00',
        // 使用css定义的主题色
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tisou1: {
          pri: '#ff0000',
        },

      },
    },

  },
  // 快捷名字
  shortcuts: {
    'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md',
    'btn-green': 'text-white bg-green-500 hover:bg-green-700',
  },
})
