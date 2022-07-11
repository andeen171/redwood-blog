import { ThemeProvider } from 'src/ThemeContext'

import LoginForm from './LoginForm'

export const generated = () => {
  return (
    <ThemeProvider>
      <LoginForm />
    </ThemeProvider>
  )
}

export default { title: 'Components/LoginForm' }
