import { render, screen, within } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './ArticlesCell'
import { standard } from './ArticlesCell.mock'

describe('ArticlesCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(render(<Success articles={standard().articles} />)).toNotThrow()
  })

  it('renders content correctly', () => {
    const articles = standard().articles
    render(<Success articles={articles} />)
    articles.forEach((article) => {
      const truncatedBody = article.body.substring(0, 100)
      const matchedBody = screen.getByText(truncatedBody)
      const ellipsis = within(matchedBody).getByText('...', { exact: false })

      expect(screen.getByText(article.title)).toBeInTheDocument()
      expect(screen.queryByText(article.body)).not.toBeInTheDocument()
      expect(matchedBody).toBeInTheDocument()
      expect(ellipsis).toBeInTheDocument()
    })
  })
})
