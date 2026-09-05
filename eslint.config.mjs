// eslint.config.mjs
import antfu from '@antfu/eslint-config'
import reactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  rules: {
    'no-console': [1, { allow: ['warn', 'error'] }],
  },
}, {
  files: ['**/*.{js,jsx,ts,tsx}'],
  plugins: {
    'react-compiler': reactCompiler,
  },
  rules: reactCompiler.configs.recommended.rules,
})
