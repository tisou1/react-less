import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  /* 配置项... */
  darkMode: 'class', // or 'media'
  theme: {
      //覆盖默认间距
      spacing: {
        '1':'2px', //使用类名 m-1 mx-1
        '2':'4px',
        '3':'8px',
        sm: '8px', //使用类名 mx-sm  m-sm ...
        md: '16px',
        lg: '24px',
        xl: '48px',
      },
      screens:{
        'sm': {'max':'640px'},
        // => @media (max-width: 640px) { ... }
  
        'md': '768px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
       
      },
      //扩展
      extend:{
        spacing: {
            '13':'22px',
            '166':'20px',
            'siry':'33px'
        },
        screens:{
            '3xl':'1600px'
        },
        colors: {
            'ddd':'#00ff00',
            //使用css定义的主题色
            primary:'var(--color-primary)',
            secondary:'var(--color-secondary)',
            "tisou1":{
                'pri': '#ff0000',
            }//使用时字体颜色为 text-tisou1-pri
           
        }
    }

  },
})
