export const schema = gql`
  type Comment {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    body: String!
    author: User
    authorId: Int
    post: Post
    postId: Int
  }

  type Query {
    comments(postId: Int!): [Comment!]! @skipAuth
    comment(id: Int!): Comment @requireAuth
  }

  input CreateCommentInput {
    body: String!
    authorId: Int
    postId: Int
  }

  input UpdateCommentInput {
    body: String
    authorId: Int
    postId: Int
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: Int!, input: UpdateCommentInput!): Comment! @requireAuth
    deleteComment(id: Int!): Comment! @requireAuth(roles: "admin")
  }
`
