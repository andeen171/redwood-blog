import { useEffect, useState } from 'react'

import { LockClosedIcon } from '@heroicons/react/solid'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, PasswordField, Submit, useForm } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import LoadingSpinner from 'src/components/LoadingSpinner'

const LoginForm = () => {
  const { isAuthenticated, logIn } = useAuth()
  const formMethods = useForm({ mode: 'onBlur' })
  const [loading, setLoading] = useState(false)
  const emailRef = React.useRef<HTMLInputElement>()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })
    setLoading(true)
    if (response.message) {
      toast(response.message)
      setLoading(false)
    } else if (response.error) {
      toast.error(response.error)
      setLoading(false)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />
      <Form onSubmit={onSubmit} formMethods={formMethods} className="space-y-3">
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <Label name="email" htmlFor="email-address" className="sr-only">
              Email address
            </Label>
            <TextField
              id="email-address"
              ref={emailRef}
              name="email"
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
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <Label name="remember-me" htmlFor="remember-me" className="ml-2 my-0 block text-sm text-gray-900">
              Remember me
            </Label>
          </div>
          <div className="text-sm">
            <Link to={routes.forgotPassword()} className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your Password?
            </Link>
          </div>
        </div>

        <div>
          <Submit className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              {loading ? (
                <div className="content-left">
                  <LoadingSpinner size={30} />
                </div>
              ) : (
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              )}
            </span>
            Sign In
          </Submit>
        </div>
      </Form>
    </>
  )
}

export default LoginForm
