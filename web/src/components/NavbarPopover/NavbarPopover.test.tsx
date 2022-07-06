import { render } from '@redwoodjs/testing/web'

import NavbarPopover from './NavbarPopover'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavbarPopover', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavbarPopover />)
    }).not.toThrow()
  })
})
