import CommentForm from './CommentForm'

export const generated = () => {
  mockGraphQLMutation('CreateCommentMutation', (variables, { ctx }) => {
    const id = Math.floor(Math.random() * 1000)
    ctx.delay(1000)

    return {
      createComment: {
        id,
        body: variables.input.body,
        createdAt: new Date().toISOString(),
        postId: variables.input.postId,
      },
    }
  })

  return <CommentForm postId={1} />
}

export default { title: 'Components/CommentForm' }
