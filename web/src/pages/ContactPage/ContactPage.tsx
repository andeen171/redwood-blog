import { CreateContactMutation, CreateContactMutationVariables } from 'types/graphql'

import { FieldError, Form, Label, TextField, TextAreaField, Submit, SubmitHandler, useForm } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import LoadingSpinner from 'src/components/LoadingSpinner'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const labelClassNames = 'block text-gray-700 dark:text-sky-700 font-medium uppercase'
const labelErrorClassNames = 'block text-red-700 dark:text-red-500 font-medium uppercase'

const formClassNames = 'border-2 rounded dark:bg-slate-700 dark:border-sky-700 dark:text-sky-700 font-medium px-2 py-1'
const formErrorClassNames = 'border-2 rounded px-2 py-1 border-red-700 dark:bg-slate-700 dark:text-white font-medium'

const fieldErrorClassNames = 'block text-red-700 dark:text-red-500 animate-pulse font-medium'

const submitButtonClassNames =
  'block font-bold bg-blue-700 dark:bg-sky-700 hover:text-blue-100 hover:bg-blue-400 dark:hover:text-sky-100 dark:hover:bg-sky-400 text-white dark:text-sky-400 mt-4 px-4 py-2 rounded'

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
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

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg">
        <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
          <Label name="name" className={labelClassNames} errorClassName={labelErrorClassNames}>
            Name
          </Label>
          <TextField
            name="name"
            validation={{ required: true }}
            className={formClassNames}
            errorClassName={formErrorClassNames}
          />
          <FieldError name="name" className={fieldErrorClassNames} />

          <Label name="email" className={labelClassNames} errorClassName={labelErrorClassNames}>
            Email
          </Label>
          <TextField
            name="email"
            validation={{
              required: true,
              pattern: {
                value: /[^@]+@[^.]+\..+/,
                message: 'Please enter a valid email address',
              },
            }}
            className={formClassNames}
            errorClassName={formErrorClassNames}
          />
          <FieldError name="email" className={fieldErrorClassNames} />

          <Label name="message" className={labelClassNames} errorClassName={labelErrorClassNames}>
            Message
          </Label>
          <TextAreaField
            name="message"
            validation={{ required: true }}
            className={formClassNames}
            errorClassName={formErrorClassNames}
          />
          <FieldError name="message" className={fieldErrorClassNames} />

          {loading ? (
            <div className="content-left">
              <LoadingSpinner size={30} />
            </div>
          ) : (
            <Submit className={submitButtonClassNames} disabled={loading}>
              Save
            </Submit>
          )}
        </Form>
      </div>
    </>
  )
}

export default ContactPage
