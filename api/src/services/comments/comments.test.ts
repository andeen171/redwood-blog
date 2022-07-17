import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

import { comments, comment, createComment, updateComment, deleteComment } from './comments'
import type { StandardScenario, PostOnlyScenario } from './comments.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('comments', () => {
  scenario('returns all comments from a post', async (scenario: StandardScenario) => {
    const result = await comments({ postId: scenario.comment.jane.postId })
    const post = await db.post.findUnique({
      where: { id: scenario.comment.jane.postId },
      include: { comments: true },
    })
    expect(result.length).toEqual(post.comments.length)
  })

  scenario('postOnly', 'creates a new comment', async (scenario: PostOnlyScenario) => {
    const comment = await createComment({
      input: {
        body: 'What is your favorite tree bark?',
        postId: scenario.post.bark.id,
        authorId: 1,
      },
    })

    expect(comment.authorId).toEqual(1)
    expect(comment.body).toEqual('What is your favorite tree bark?')
    expect(comment.postId).toEqual(scenario.post.bark.id)
    expect(comment.createdAt).not.toEqual(null)
  })

  scenario('creates a comment', async () => {
    const result = await createComment({
      input: { updatedAt: '2022-07-17T20:14:37Z', body: 'String' },
    })

    expect(result.updatedAt).toEqual('2022-07-17T20:14:37Z')
    expect(result.body).toEqual('String')
  })

  scenario('updates a comment', async (scenario: StandardScenario) => {
    const original = await comment({ id: scenario.comment.one.id })
    const result = await updateComment({
      id: original.id,
      input: { body: 'String2' },
    })

    expect(result.body).toEqual('String2')
  })

  scenario('allows a moderator to delete a comment', async (scenario: StandardScenario) => {
    mockCurrentUser({
      roles: 'MOD',
      id: 1,
      email: 'moderator@moderator.com',
      name: 'Moderator',
    })

    const comment = await deleteComment({
      id: scenario.comment.jane.id,
    })
    expect(comment.id).toEqual(scenario.comment.jane.id)

    const result = await comments({ postId: scenario.comment.jane.id })
    expect(result.length).toEqual(0)
  })

  scenario('does not allow a non-moderator to delete a comment', async (scenario: StandardScenario) => {
    mockCurrentUser({
      roles: 'MOD',
      id: 1,
      email: 'moderator@moderator.com',
      name: 'Moderator',
    })

    expect(() =>
      deleteComment({
        id: scenario.comment.jane.id,
      })
    ).toThrow(ForbiddenError)
  })

  scenario('does not allow a logged out user to delete a comment', async (scenario: StandardScenario) => {
    mockCurrentUser(null)

    expect(() =>
      deleteComment({
        id: scenario.comment.jane.id,
      })
    ).toThrow(AuthenticationError)
  })
})
