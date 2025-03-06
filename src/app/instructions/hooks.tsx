import {useEffect} from 'react'
import {useTheme} from 'next-themes'

// Permet de switcher de Theme Prism
// Fonctionne avec des fichiers styles dans `public/styles/themes`
export function usePrismTheme() {
  const {theme = 'dark'} = useTheme()

  useEffect(() => {
    const lightThemeLink = document.createElement('link')
    lightThemeLink.rel = 'stylesheet'
    lightThemeLink.href = '/styles/themes/prism-light.css'
    lightThemeLink.id = 'prism-light-theme'

    const darkThemeLink = document.createElement('link')
    darkThemeLink.rel = 'stylesheet'
    darkThemeLink.href = '/styles/themes/prism-dark.css'
    darkThemeLink.id = 'prism-dark-theme'

    if (theme === 'light') {
      document.head.append(lightThemeLink)
      const darkLink = document.querySelector('#prism-dark-theme')
      if (darkLink) {
        darkLink.remove()
      }
    } else {
      document.head.append(darkThemeLink)
      const lightLink = document.querySelector('#prism-light-theme')
      if (lightLink) {
        lightLink.remove()
      }
    }

    return () => {
      if (theme === 'light') {
        lightThemeLink.remove()
      } else {
        darkThemeLink.remove()
      }
    }
  }, [theme])

  return theme
}
