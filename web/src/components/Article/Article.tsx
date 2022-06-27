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
        <h2 className="text-xl text-blue-700 font-semibold">
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
      <div className="mt-2 text-gray-900 font-light">{article.body}</div>
    </article>
  )
}

export default Article
