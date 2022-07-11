import { ThemeProvider } from 'src/ThemeContext'

import BlogLayout from './BlogLayout'

export const generated = () => {
  return (
    <ThemeProvider>
      <BlogLayout />
    </ThemeProvider>
  )
}

export default { title: 'Layouts/BlogLayout' }
