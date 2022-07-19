import { render } from '@redwoodjs/testing/web'

import UserDropdown from './UserDropdown'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserDropdown', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserDropdown name="User" logOut={() => {}} />)
    }).not.toThrow()
  })
})
