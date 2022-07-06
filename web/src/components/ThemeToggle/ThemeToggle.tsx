import { FaSun, FaMoon } from 'react-icons/fa'

import { ThemeContext } from 'src/ThemeContext'

const ThemeToggle = () => {
  const [theme, setTheme] = React.useContext(ThemeContext)

  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2 nav-bar-link">
      {theme === 'dark' ? (
        <FaSun onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      ) : (
        <FaMoon onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      )}
    </div>
  )
}

export default ThemeToggle
