import { ThemeProvider } from 'src/ThemeContext'

import Loading from './LoadingSpinner'

export const Spinner = () => {
  return (
    <ThemeProvider>
      <Loading />
    </ThemeProvider>
  )
}

export default { title: 'Components/Loading' }
