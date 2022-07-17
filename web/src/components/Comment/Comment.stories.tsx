import Comment from './Comment'
import { standard } from './Comment.mock'

export const generated = () => {
  return (
    <div className="m-4">
      <Comment {...standard()} />
    </div>
  )
}

export const moderatorView = () => {
  mockCurrentUser({
    roles: ['MOD'],
    id: 1,
    email: 'moderator@moderator.com',
    name: 'Moderator',
  })

  return (
    <div className="m-4">
      <Comment {...standard()} />
    </div>
  )
}

export default { title: 'Components/Comment' }
