// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  comments: [
    {
      id: 1,
      body: 'First comment',
      createdAt: '2020-01-02T12:34:56Z',
      author: {
        name: 'Rob Cameron',
      },
    },
    {
      id: 2,
      body: 'Second comment',
      createdAt: '2020-02-03T23:00:00Z',
      author: {
        name: 'David Price',
      },
    },
  ],
})
