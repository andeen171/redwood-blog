import { FaSun, FaMoon } from 'react-icons/fa'

import { ThemeContext } from 'src/ThemeContext'

function filterKeyEnter(handler) {
  return (e) => {
    if (e.keyCode === 13) {
      handler(e)
    }
  }
}

function accessibleOnClick(handler) {
  return {
    role: 'button',
    onKeyDown: filterKeyEnter(handler),
    onClick: handler,
  }
}

const ThemeToggle = () => {
  const [theme, setTheme] = React.useContext(ThemeContext)

  return (
    <div
      {...accessibleOnClick(() => setTheme(theme === 'dark' ? 'light' : 'dark'))}
      className="transition duration-500 ease-in-out rounded-full p-2 nav-bar-link cursor-pointer"
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </div>
  )
}

export default ThemeToggle
