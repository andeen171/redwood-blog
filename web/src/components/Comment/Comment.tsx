import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'
import formatDate from 'src/utils/FormatDate/FormatDate'

const DELETE_COMMENT = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      postId
    }
  }
`

interface Props {
  comment: {
    id: number
    body: string
    author: {
      id: number
      name: string
    }
    createdAt: string
    postId: number
  }
}

const Comment = ({ comment }: Props) => {
  const { hasRole } = useAuth()

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      {
        query: CommentsQuery,
        variables: { postId: comment.postId },
      },
    ],
  })

  const moderate = () => {
    if (confirm('Are you sure?')) {
      deleteComment({
        variables: { id: comment.id },
      })
    }
  }
  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg relative">
      <header>
        <h2 className="text-md text-blue-700 dark:text-sky-400 font-semibold dark:font-medium hover:text-blue-400 dark:hover:text-sky-200  transition duration-100">
          {comment.author.name}
        </h2>
        <time className="text-slate-700 text-xs dark:text-gray-300" dateTime={comment.createdAt}>
          {formatDate(comment.createdAt)}
        </time>
      </header>
      <header className="flex justify-between"></header>
      <p className="mt-2 text-gray-900 dark:text-gray-300 font-light">{comment.body}</p>
      {hasRole('MOD') && (
        <button
          type="button"
          onClick={moderate}
          className="absolute bottom-2 right-2 bg-red-500 text-xs rounded text-white px-2 py-1"
        >
          Delete
        </button>
      )}
    </div>
  )
}

export default Comment
