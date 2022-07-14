import { ThemeProvider } from 'src/ThemeContext'

import ArticlePage from './ArticlePage'

export const generated = () => {
  return (
    <ThemeProvider>
      <ArticlePage id={1} />
    </ThemeProvider>
  )
}

export default { title: 'Pages/ArticlePage' }
