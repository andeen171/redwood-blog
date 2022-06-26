import type { Post } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

interface Props {
  article: Partial<Post>
}

const Article = ({ article }: Props) => {
  const { isAuthenticated } = useAuth()
  return (
    <article>
      <header>
        <h2>
          <Link
            to={
              isAuthenticated
                ? routes.article({ id: article.id })
                : routes.login()
            }
          >
            {article.title}
          </Link>
        </h2>
      </header>
      <div>{article.body}</div>
      <div>Posted at: {article.createdAt}</div>
    </article>
  )
}

export default Article
