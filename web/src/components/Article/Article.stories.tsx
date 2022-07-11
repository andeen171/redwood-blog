import { ThemeProvider } from 'src/ThemeContext'

import Article from './Article'
import { standard } from './Article.mock'

export const full = () => {
  return (
    <ThemeProvider>
      <Article {...standard()} />
    </ThemeProvider>
  )
}

export const summary = () => {
  return (
    <ThemeProvider>
      <Article {...standard()} summary={true} />
    </ThemeProvider>
  )
}

export default { title: 'Components/Article' }
