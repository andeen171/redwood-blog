import type { Post } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

const truncate = (text: string, length: number) => {
  return text.substring(0, length) + '...'
}

interface Props {
  article: Partial<Post>
  summary?: boolean
}

const Article = ({ article, summary = false }: Props) => {
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
        <p className="text-slate-700 text-xs">{article.createdAt}</p>
      </header>
      <div className="mt-2 text-gray-900 font-light">
        {summary ? truncate(article.body, 100) : article.body}
      </div>
    </article>
  )
}

export default Article
