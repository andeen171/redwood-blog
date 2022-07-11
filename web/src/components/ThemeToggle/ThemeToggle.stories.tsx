import { ThemeProvider } from 'src/ThemeContext'

import ThemeToggle from './ThemeToggle'

export const generated = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
}

export default { title: 'Components/ThemeToggle' }
