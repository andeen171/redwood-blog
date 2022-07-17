import { LockClosedIcon } from '@heroicons/react/solid'

import { useAuth } from '@redwoodjs/auth'
import { Form, useForm, Label, TextField, PasswordField, Submit, SubmitHandler } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

interface FormValues {
  name: string
  email: string
  password: string
}

const SignupForm = () => {
  const { isAuthenticated, signUp } = useAuth()
  const formMethods = useForm({ mode: 'onBlur' })

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await signUp({ ...data })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <div>
        <h1 className="text-3xl text-center sm:text-4xl md:text-5xl font-semibold tracking-tight">
          <Link
            className="font-semibold text-blue-400 dark:text-sky-300 hover:text-blue-100 dark:hover:text-sky-100  transition duration-100"
            to={routes.home()}
          >
            Redwood Blog
          </Link>
        </h1>
      </div>
      <Form onSubmit={onSubmit} formMethods={formMethods} className="mt-8 space-y-6">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <Label name="email" htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <TextField
              id="email"
              name="username"
              autoComplete="email"
              className="form-field rounded-t-md"
              placeholder="Email address"
              validation={{
                required: {
                  value: true,
                  message: 'Email is required',
                },
                pattern: {
                  value: /^[^@]+@[^.]+\..+$/,
                  message: 'Please enter a valid email address',
                },
              }}
            />
          </div>
          <div>
            <Label name="name" htmlFor="name" className="sr-only">
              Username
            </Label>
            <TextField
              id="name"
              name="name"
              autoComplete="Name"
              className="form-field"
              placeholder="Username"
              validation={{
                required: {
                  value: true,
                  message: 'Name is required',
                },
              }}
            />
          </div>
          <div>
            <Label name="password" htmlFor="password" className="sr-only">
              Password
            </Label>
            <PasswordField
              id="password"
              name="password"
              autoComplete="current-password"
              className="form-field rounded-b-md"
              placeholder="Password"
              validation={{
                required: {
                  value: true,
                  message: 'Password is required',
                },
              }}
            />
          </div>
        </div>

        <div>
          <Submit className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 dark:bg-sky-700 hover:text-blue-100 hover:bg-blue-400 dark:hover:text-sky-100 dark:hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring:bg-sky-500">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-blue-500 dark:text-sky-500 dark:group-hover:text-sky-300 group-hover:text-blue-300"
                aria-hidden="true"
              />
            </span>
            Sign Up
          </Submit>
        </div>
      </Form>
    </>
  )
}

export default SignupForm
