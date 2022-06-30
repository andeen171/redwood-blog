import { render, screen, within } from '@redwoodjs/testing/web'

import Article from './Article'
import { standard } from './Article.mock'

describe('Article', () => {
  const article = standard().article
  it('renders a full article successfully', () => {
    render(<Article article={article} />)
    expect(screen.getByText(article.title)).toBeInTheDocument()
    expect(screen.getByText(article.body)).toBeInTheDocument()
  })

  it('renders a partial article successfully', () => {
    render(<Article article={article} summary={true} />)
    const truncatedBody = article.body.substring(0, 10)
    const matchedBody = screen.getByText(truncatedBody, { exact: false })
    const ellipsis = within(matchedBody).getByText('...', { exact: false })
    expect(screen.getByText(article.title)).toBeInTheDocument()
    expect(screen.queryByText(article.body)).not.toBeInTheDocument()
    expect(matchedBody).toBeInTheDocument()
    expect(ellipsis).toBeInTheDocument()
  })
})
