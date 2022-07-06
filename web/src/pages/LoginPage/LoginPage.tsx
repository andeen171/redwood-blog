import { useEffect, useRef, useState } from 'react'

import { LockClosedIcon } from '@heroicons/react/solid'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, PasswordField, Submit, useForm } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import LoadingSpinner from 'src/components/LoadingSpinner'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const formMethods = useForm({ mode: 'onBlur' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

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
      <Toaster />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
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
                  id="email-address"
                  name="email"
                  autoComplete="email"
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                <Label name="remember-me" htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
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
                    <LockClosedIcon
                      className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                      aria-hidden="true"
                    />
                  )}
                </span>
                Sign In
              </Submit>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
