import type { FindPosts } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query PostsQuery {
    posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<FindPosts>) => {
  return (
    <>
      {posts.map((post) => (
        <article key={post.id}>
          <header>
            <h2>{post.title}</h2>
          </header>
          <p>{post.body}</p>
          <div>Posted at: {post.createdAt}</div>
        </article>
      ))}
    </>
  )
}
