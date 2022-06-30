import formatDate from 'src/utils/FormatDate/FormatDate'

describe('FormatDate', () => {
  it('should format date', () => {
    const date = new Date('01-01-2020')
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('1 January 2020')
  })
})
