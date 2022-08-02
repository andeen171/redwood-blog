import { Link, routes } from '@redwoodjs/router'

import CommentForm from 'src/components/CommentForm'
import CommentsCell from 'src/components/CommentsCell'
import formatDate from 'src/utils/FormatDate/FormatDate'
import truncateText from 'src/utils/TruncateText/TruncateText'

interface Props {
  article: {
    id: number
    title: string
    body: string
    createdAt: string
  }
  summary?: boolean
}

const Article = ({ article, summary = false }: Props) => {
  return (
    <>
      <article className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
        <header>
          <h2 className="text-xl text-blue-700 dark:text-sky-400 font-semibold dark:font-medium hover:text-blue-400 dark:hover:text-sky-200 transition duration-100">
            <Link to={routes.article({ id: article.id })}>{article.title}</Link>
          </h2>
          <time className="text-slate-700 text-xs dark:text-gray-300">{formatDate(article.createdAt)}</time>
        </header>
        <div className="mt-2 text-gray-900 dark:text-gray-300 font-light">
          {summary ? truncateText(article.body, 100) : article.body}
        </div>
        {!summary && (
          <div className="mt-12">
            <CommentForm postId={article.id} />
            <div className="mt-12">
              <CommentsCell postId={article.id} />
            </div>
          </div>
        )}
      </article>
    </>
  )
}

export default Article
