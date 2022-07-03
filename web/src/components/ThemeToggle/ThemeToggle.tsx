import { FaSun, FaMoon } from 'react-icons/fa'

import { ThemeContext } from 'src/ThemeContext'

const ThemeToggle = () => {
  const [theme, setTheme] = React.useContext(ThemeContext)
  const iconClassNames =
    'text-blue-400 dark:text-sky-300 hover:text-blue-100 dark:hover:text-sky-100 transition duration-200 cursor-pointer '

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      {theme === 'dark' ? (
        <FaSun onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={iconClassNames} />
      ) : (
        <FaMoon onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={iconClassNames} />
      )}
    </div>
  )
}

export default ThemeToggle
