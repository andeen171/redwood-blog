import { render, screen } from '@redwoodjs/testing/web'

import formatDate from 'src/utils/FormatDate/FormatDate'

import { Loading, Empty, Failure, Success } from './ArticleCell'
import { standard } from './ArticleCell.mock'

describe('ArticleCell', () => {
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
    expect(() => {
      render(<Success article={standard().article} />)
    }).not.toThrow()
  })

  it('renders success content correctly', async () => {
    const article = standard().article
    render(<Success article={article} />)
    expect(screen.getByText(article.title)).toBeInTheDocument()
    expect(screen.getByText(formatDate(article.createdAt))).toBeInTheDocument()
    expect(screen.getByText(article.body)).toBeInTheDocument()
  })
})
