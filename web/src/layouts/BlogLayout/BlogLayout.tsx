import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import ThemeToggle from 'src/components/ThemeToggle'

const linkClassNames =
  'py-2 px-4 font-semibold text-blue-400 dark:text-sky-300 hover:text-blue-100 dark:hover:text-sky-100  transition duration-100'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <Popover className="relative bg-blue-700 dark:bg-sky-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                <Link className={linkClassNames} to={routes.home()}>
                  Redwood Blog
                </Link>
              </h1>
            </div>
            <div className="-my-2 md:hidden">
              <Popover.Button className="bg-blue-400 dark:bg-sky-300 hover:bg-blue-100 dark:hover:bg-sky-100 text-blue-700 dark:text-sky-500 rounded-md p-2 inline-flex items-center justify-center">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <ThemeToggle />
              <Link className={linkClassNames} to={routes.contact()}>
                Contact
              </Link>
              {isAuthenticated ? (
                <>
                  <div>
                    <p className={linkClassNames}>{currentUser.email}</p>
                  </div>
                  <div>
                    <button type="button" onClick={logOut} className={linkClassNames}>
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Link to={routes.login()} className={linkClassNames}>
                      Sign In
                    </Link>
                  </div>
                  <div>
                    <Link to={routes.signup()} className={linkClassNames}>
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Transition
          as={React.Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-sky-500 text-white divide-y-2 divide-gray-50 dark:divide-sky-400">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <div className="-mr-2">
                    <Popover.Button className="bg-white dark:bg-sky-500 hover:bg-blue-100 dark:hover:bg-sky-100 text-blue-300 dark:text-sky-300 rounded-md p-2 inline-flex items-center justify-center transition-all">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-3 text-right">
                <Link className={linkClassNames} to={routes.contact()}>
                  Contact Us
                </Link>
                {isAuthenticated ? (
                  <div>
                    <p className={linkClassNames}>{currentUser.email}</p>
                    <div className="flex justify-end">
                      <button type="button" onClick={logOut} className={linkClassNames}>
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <Link to={routes.login()} className={linkClassNames}>
                        Sign In
                      </Link>
                    </div>
                    <div>
                      <Link to={routes.signup()} className={linkClassNames}>
                        Sign Up
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <main className="max-w-4xl mx-auto p-12">{children}</main>
    </>
  )
}

export default BlogLayout
