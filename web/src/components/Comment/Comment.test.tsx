import { render, screen } from '@redwoodjs/testing/web'

import formatDate from 'src/utils/FormatDate/FormatDate'

import Comment from './Comment'
import { standard } from './Comment.mock'

describe('Comment', () => {
  const comment = standard().comment

  it('renders successfully', () => {
    expect(() => {
      render(<Comment {...standard()} />)
    }).not.toThrow()
  })

  it('renders comment correctly', () => {
    render(<Comment {...standard()} />)
    expect(screen.getByText(comment.name)).toBeInTheDocument()
    expect(screen.getByText(comment.body)).toBeInTheDocument()
    const dateExpect = screen.getByText(formatDate(comment.createdAt))
    expect(dateExpect).toBeInTheDocument()
    expect(dateExpect.nodeName).toEqual('TIME')
    expect(dateExpect).toHaveAttribute('datetime', comment.createdAt)
  })
})
