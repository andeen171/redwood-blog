import truncateText from './TruncateText'

describe('Truncate Text', () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique risus et orci vehicula'

  it('Truncate text if bigger than size', () => {
    expect(truncateText(text, 50)).toContain('...')
  })

  it('Returns text if smaller than size', () => {
    expect(truncateText(text, 100)).toEqual(text)
  })
})
