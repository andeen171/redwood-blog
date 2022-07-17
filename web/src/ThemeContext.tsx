const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return 'dark'
    }
  }
  // light theme as the default
  return 'light'
}

export const ThemeContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([
  getInitialTheme(),
  () => {},
])

interface Props {
  children: React.ReactNode
  initialTheme?: string
}

export const ThemeProvider = ({ initialTheme, children }: Props) => {
  const [theme, setTheme] = React.useState(getInitialTheme)

  const rawSetTheme = (rawTheme) => {
    const root = window.document.documentElement
    const isDark = rawTheme === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(rawTheme)

    localStorage.setItem('color-theme', rawTheme)
  }

  if (initialTheme) {
    rawSetTheme(initialTheme)
  }

  React.useEffect(() => {
    rawSetTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      <div className="bg-white dark:bg-slate-900 transition-all">{children}</div>
    </ThemeContext.Provider>
  )
}
