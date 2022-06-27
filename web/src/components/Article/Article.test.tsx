import { render } from '@redwoodjs/testing/web'

import Article from './Article'
import { standard } from './Article.mock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Article', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Article {...standard()} />)
    }).not.toThrow()
  })
})
