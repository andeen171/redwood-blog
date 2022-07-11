import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import LoginForm from 'src/components/LoginForm/LoginForm'

const LoginPage = () => {
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
          <LoginForm />
        </div>
      </div>
    </>
  )
}

export default LoginPage
