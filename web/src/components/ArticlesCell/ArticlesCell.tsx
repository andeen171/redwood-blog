import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from 'src/components/Article'
import LoadingSpinner from 'src/components/LoadingSpinner'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <LoadingSpinner />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => <div style={{ color: 'red' }}>Error: {error.message}</div>

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <>
      <div className="container mx-auto space-y-4">
        {articles.map((article) => (
          <Article key={article.id} article={article} summary={true} />
        ))}
      </div>
    </>
  )
}
