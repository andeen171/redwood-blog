export const schema = gql`
  type Post {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    published: Boolean!
    title: String!
    body: String!
    author: User
    authorId: Int!
  }

  type Query {
    posts: [Post!]! @skipAuth
    post(id: Int!): Post @skipAuth
  }

  input CreatePostInput {
    published: Boolean!
    title: String!
    body: String!
    authorId: Int!
    updatedAt: Date
  }

  input UpdatePostInput {
    published: Boolean
    title: String
    body: String
    authorId: Int
    updatedAt: Date
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
