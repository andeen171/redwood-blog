import { useEffect, useRef } from 'react'

import { LockClosedIcon } from '@heroicons/react/solid'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, PasswordField, Submit, useForm } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

const LoginForm = () => {
  const { logIn } = useAuth()
  const formMethods = useForm({ mode: 'onBlur' })
  const emailRef = useRef<HTMLInputElement>()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })
    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      window.location.reload()
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <Form onSubmit={onSubmit} formMethods={formMethods} className="space-y-3">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <Label name="email" htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <TextField
              id="email-address"
              ref={emailRef}
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

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-700 dark:text-sky-500 focus:ring-blue-700 dark:focus:ring-sky-500 border-gray-300 dark:border-slate-700 dark:bg-slate-800 rounded"
            />
            <Label
              name="remember-me"
              htmlFor="remember-me"
              className="ml-2 my-0 block text-sm text-gray-900 dark:text-gray-300 dark:bg-slate"
            >
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <Link
              to={routes.forgotPassword()}
              className="font-medium text-blue-700 dark:text-sky-500  hover:text-blue-500 dark:hover:text-sky-300"
            >
              Forgot your Password?
            </Link>
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
            Sign In
          </Submit>
        </div>
      </Form>
    </>
  )
}

export default LoginForm
