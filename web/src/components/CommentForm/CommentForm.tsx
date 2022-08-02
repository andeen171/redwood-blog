import ChatIcon from '@heroicons/react/outline/ChatIcon'
import { AiOutlineLoading } from 'react-icons/ai'
import { CreateCommentMutation, CreateCommentMutationVariables } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { Form, TextAreaField, Submit, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as CommentsQuery } from 'src/components/CommentsCell'

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
      createdAt
      authorId
      postId
    }
  }
`

interface FormValues {
  body: string
}

interface props {
  postId: number
}

const CommentForm = ({ postId }: props) => {
  const formMethods = useForm()
  const { currentUser } = useAuth()
  const [createComment, { loading, error }] = useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CREATE_COMMENT,
    {
      onCompleted: () => {
        toast.success('Thank you for your submission!')
        formMethods.reset()
      },
      onError: (err) => {
        toast.error(err.message)
      },
      refetchQueries: [{ query: CommentsQuery, variables: { postId } }],
    }
  )

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    const authorId = currentUser.id
    createComment({ variables: { input: { postId, authorId, ...input } } })
  }
  return (
    <Form className="mt-4 w-full space-y-3" error={error} formMethods={formMethods} onSubmit={onSubmit}>
      <h3 className="text-md text-blue-700 dark:text-sky-400 font-semibold">Leave a Comment</h3>
      <div className="h-auto">
        <TextAreaField
          name="body"
          placeholder="Tell everyone what you think about this article!"
          validation={{ required: true }}
          className="form-field rounded"
        />
      </div>
      <div className="flex justify-end">
        <Submit
          disabled={loading}
          className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 dark:bg-sky-700 hover:text-blue-100 hover:bg-blue-400 dark:hover:text-sky-100 dark:hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring:bg-sky-500"
        >
          {loading ? (
            <span className="inset-y-0 flex items-center pl-3">
              <AiOutlineLoading className="animate-spin h-5 w-5 text-blue-500 dark:text-sky-500 dark:group-hover:text-sky-300 group-hover:text-blue-300" />
            </span>
          ) : (
            <>
              Comment
              <span className="right-2 inset-y-0 flex items-center pl-3">
                <ChatIcon
                  className="h-5 w-5 text-blue-500 dark:text-sky-500 dark:group-hover:text-sky-300 group-hover:text-blue-300"
                  aria-hidden="true"
                />
              </span>
            </>
          )}
        </Submit>
      </div>
    </Form>
  )
}

export default CommentForm
