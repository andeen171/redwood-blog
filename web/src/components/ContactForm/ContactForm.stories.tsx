import { ThemeProvider } from 'src/ThemeContext'

import ContactForm from './ContactForm'

export const generated = () => {
  return (
    <ThemeProvider>
      <ContactForm />
    </ThemeProvider>
  )
}

export default { title: 'Components/ContactForm' }
