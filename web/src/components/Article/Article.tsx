import type { Post } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import formatDate from 'src/utils/FormatDate/FormatDate'
import truncateText from 'src/utils/TruncateText/TruncateText'

interface Props {
  article: Partial<Post>
  summary?: boolean
}

const Article = ({ article, summary = false }: Props) => {
  const { isAuthenticated } = useAuth()
  return (
    <article className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
      <header>
        <h2 className="text-xl text-blue-700 dark:text-sky-400 font-semibold dark:font-medium hover:text-sky-200 transition duration-100">
          <Link to={isAuthenticated ? routes.article({ id: article.id }) : routes.login()}>{article.title}</Link>
        </h2>
        <p className="text-slate-700 text-xs dark:text-gray-300">{formatDate(article.createdAt)}</p>
      </header>
      <div className="mt-2 text-gray-900 dark:text-gray-300 font-light">
        {summary ? truncateText(article.body, 100) : article.body}
      </div>
    </article>
  )
}

export default Article
