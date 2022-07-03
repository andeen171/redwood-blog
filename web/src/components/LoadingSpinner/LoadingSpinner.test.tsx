import { render } from '@redwoodjs/testing/web'

import LoadingSpinner from './LoadingSpinner'

describe('Loading Spinner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LoadingSpinner />)
    }).not.toThrow()
  })
})
