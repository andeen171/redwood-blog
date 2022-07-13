import { useRef, useEffect } from 'react'

import { ChatIcon } from '@heroicons/react/solid'
import { AiOutlineLoading } from 'react-icons/ai'
import { CreateContactMutation, CreateContactMutationVariables } from 'types/graphql'

import { Form, TextField, FieldError, TextAreaField, Submit, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactForm = () => {
  const formMethods = useForm()
  const nameRef = useRef<HTMLInputElement>()
  const [create, { loading, error }] = useMutation<CreateContactMutation, CreateContactMutationVariables>(
    CREATE_CONTACT,
    {
      onCompleted: () => {
        toast.success('Thank you for your submission!')
        formMethods.reset()
      },
      onError: (err) => {
        toast.error(err.message)
      },
    }
  )

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    create({ variables: { input: data } })
  }

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  return (
    <>
      <Form onSubmit={onSubmit} error={error} formMethods={formMethods} className="space-y-3">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <TextField
              name="name"
              placeholder="Name*"
              ref={nameRef}
              validation={{ required: true }}
              className="form-field rounded-t-md"
              errorClassName="form-field-error rounded-t-md"
            />
          </div>

          <div>
            <TextField
              name="email"
              placeholder="Email*"
              validation={{
                required: true,
                pattern: {
                  value: /[^@]+@[^.]+\..+/,
                  message: 'Please enter a valid email address',
                },
              }}
              className="form-field"
              errorClassName="form-field-error"
            />
          </div>
          <div>
            <TextAreaField
              name="message"
              placeholder="Tell us what you think about our service*"
              validation={{ required: true }}
              className="form-field rounded-b-md"
              errorClassName="form-field-error rounded-b-md"
            />
            <FieldError name="message" className="form-field-error-label absolute z-10" />
          </div>
        </div>
        <div>
          <Submit
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? (
              <span className="inset-y-0 flex items-center pl-3">
                <AiOutlineLoading className="animate-spin h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
              </span>
            ) : (
              <>
                <span className="absolute right-2 inset-y-0 flex items-center pl-3">
                  <ChatIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Send
              </>
            )}
          </Submit>
        </div>
      </Form>
    </>
  )
}

export default ContactForm
