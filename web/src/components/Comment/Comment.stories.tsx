import { ThemeProvider } from 'src/ThemeContext'

import Comment from './Comment'
import { standard } from './Comment.mock'

export const generated = () => {
  return (
    <ThemeProvider>
      <Comment {...standard()} />
    </ThemeProvider>
  )
}

export default { title: 'Components/Comment' }
