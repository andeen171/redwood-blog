import { CreateContactMutation, CreateContactMutationVariables } from 'types/graphql'

import { FieldError, Form, TextField, TextAreaField, Submit, SubmitHandler, useForm } from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LoadingSpinner from 'src/components/LoadingSpinner'

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

      <Form onSubmit={onSubmit} error={error} formMethods={formMethods}>
        <TextField
          name="name"
          placeholder="Name"
          validation={{ required: true }}
          className="form-field rounded-t-md"
          errorClassName="form-field-error"
        />
        <FieldError name="name" className="form-field-error-label" />

        <TextField
          name="email"
          placeholder="Email"
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
        <FieldError name="email" className="form-field-error-label" />

        <TextAreaField
          name="message"
          placeholder="Tell us what you think about our service"
          validation={{ required: true }}
          className="form-field rounded-b-md"
          errorClassName="form-field-error"
        />
        <FieldError name="message" className="form-field-error-label" />
        <div className="flex justify-center">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Submit className="form-submit" disabled={loading}>
              Save
            </Submit>
          )}
        </div>
      </Form>
    </>
  )
}

export default ContactForm
