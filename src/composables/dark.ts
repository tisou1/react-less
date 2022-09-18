declare global {
  interface Window { __theme: any }
}
// react beta
const __theme = localStorage.getItem('theme')
if (!__theme)
  window.__theme = 'light'

else if (__theme === 'dark')
  setTheme('dark')

function setTheme(newTheme: string) {
  console.log(newTheme)
  window.__theme = newTheme
  if (newTheme === 'dark')
    document.documentElement.classList.add('dark')

  else
    document.documentElement.classList.remove('dark')
}

function __changeTheme(newTheme: string) {
  setTheme(newTheme)
  try {
    localStorage.setItem('theme', newTheme)
  }
  catch (err) {}
}

export {
  __changeTheme,
}
