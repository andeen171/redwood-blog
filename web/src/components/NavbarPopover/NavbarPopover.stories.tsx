import { ThemeProvider } from 'src/ThemeContext'

import NavbarPopover from './NavbarPopover'

export const generated = () => {
  return (
    <ThemeProvider>
      <NavbarPopover />
    </ThemeProvider>
  )
}

export default { title: 'Components/NavbarPopover' }
