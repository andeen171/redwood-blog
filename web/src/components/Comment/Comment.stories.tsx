import Comment from './Comment'
import { standard } from './Comment.mock'

export const generated = () => {
  return <Comment {...standard()} />
}

export default { title: 'Components/Comment' }
