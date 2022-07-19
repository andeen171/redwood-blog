import { render, screen, waitFor } from '@redwoodjs/testing/web'

import formatDate from 'src/utils/FormatDate/FormatDate'

import Comment from './Comment'
import { standard } from './Comment.mock'

describe('Comment', () => {
  const comment = standard().comment

  it('renders successfully', () => {
    render(<Comment comment={comment} />)
    expect(screen.getByText(comment.author.name)).toBeInTheDocument()
    expect(screen.getByText(comment.body)).toBeInTheDocument()
    const dateExpect = screen.getByText(formatDate(comment.createdAt))
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', comment.createdAt)
  })

  it('does not render a delete button if user is logged out', async () => {
    render(<Comment comment={comment} />)

    await waitFor(() => expect(screen.queryByText('Delete')).not.toBeInTheDocument())
  })

  it('renders a delete button if the user is a moderator', async () => {
    mockCurrentUser({
      roles: 'MOD',
      id: 1,
      email: 'moderator@moderator.com',
      name: 'moderador',
    })

    render(<Comment comment={comment} />)

    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument())
  })
})
