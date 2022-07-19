import { AuthenticationError, ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

import { comments, comment, createComment, updateComment, deleteComment } from './comments'
import type { StandardScenario, PostOnlyScenario } from './comments.scenarios'

describe('comments', () => {
  scenario('returns all comments from a post', async (scenario: StandardScenario) => {
    const result = await comments({ postId: scenario.comment.joao.postId })
    const post = await db.post.findUnique({
      where: { id: scenario.comment.joao.postId },
      include: { comments: true },
    })
    expect(result.length).toEqual(post.comments.length)
  })

  scenario('creates a new comment', async (scenario: PostOnlyScenario) => {
    const comment = await createComment({
      input: {
        body: 'What is your favorite tree bark?',
        postId: scenario.post.one.id,
        authorId: scenario.user.joao.id,
      },
    })

    expect(comment.authorId).toEqual(scenario.user.joao.id)
    expect(comment.body).toEqual('What is your favorite tree bark?')
    expect(comment.postId).toEqual(scenario.post.one.id)
    expect(comment.createdAt).not.toEqual(null)
  })

  scenario('updates an existing comment', async (scenario: StandardScenario) => {
    const original = await comment({ id: scenario.comment.joao.id })
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
      id: scenario.comment.joao.id,
    })
    expect(comment.id).toEqual(scenario.comment.joao.id)

    const result = await comments({ postId: scenario.comment.joao.postId })
    expect(result.length).toEqual(0)
  })

  scenario('does not allow a non-moderator to delete a comment', async (scenario: StandardScenario) => {
    mockCurrentUser({
      roles: 'USER',
      id: 1,
      email: 'user@user.com',
      name: 'User',
    })

    expect(() =>
      deleteComment({
        id: scenario.comment.joao.id,
      })
    ).toThrow(ForbiddenError)
  })

  scenario('does not allow a logged out user to delete a comment', async (scenario: StandardScenario) => {
    mockCurrentUser(null)

    expect(() =>
      deleteComment({
        id: scenario.comment.joao.id,
      })
    ).toThrow(AuthenticationError)
  })
})
