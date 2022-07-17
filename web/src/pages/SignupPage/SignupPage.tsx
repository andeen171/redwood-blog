import { MetaTags } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'

import SignupForm from 'src/components/SignupForm/SignupForm'

const SignupPage = () => {
  return (
    <>
      <MetaTags title="Signup" />

      <Toaster />
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <SignupForm />
        </div>
      </div>
    </>
  )
}

export default SignupPage
