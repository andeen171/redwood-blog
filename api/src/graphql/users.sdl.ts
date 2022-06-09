export const schema = gql`
  type User {
    id: Int!
    createdAt: DateTime!
    email: String!
    name: String
    role: Role!
    posts: [Post]!
  }

  enum Role {
    USER
    ADMIN
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    role: Role!
  }

  input UpdateUserInput {
    email: String
    name: String
    role: Role
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
