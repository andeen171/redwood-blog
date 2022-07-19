// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  comments: [
    {
      id: 1,
      body: 'First comment',
      createdAt: '2020-01-02T12:34:56Z',
      author: {
        id: 1,
        name: 'Rob Cameron',
      },
      postId: 1,
    },
    {
      id: 2,
      body: 'Second comment',
      createdAt: '2020-02-03T23:00:00Z',
      author: {
        id: 2,
        name: 'David Price',
      },
      postId: 1,
    },
  ],
})
