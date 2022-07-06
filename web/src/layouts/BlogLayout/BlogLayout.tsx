import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import ContactForm from 'src/components/ContactForm/ContactForm'
import LoginForm from 'src/components/LoginForm/LoginForm'
import NavBarPopover from 'src/components/NavbarPopover'
import ThemeToggle from 'src/components/ThemeToggle'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <Toaster />
      <Popover className="relative bg-white border-b-2 border-gray-100 dark:bg-slate-800 dark:border-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-5">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
                <Link className="nav-bar-link" to={routes.home()}>
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
            <Popover.Group as="nav" className="hidden md:flex space-x-2 items-center justify-end md:flex-1 lg:w-0">
              <div className="nav-bar-link">
                <ThemeToggle />
              </div>
              <div className="nav-bar-link">
                <NavBarPopover title="Contact us">
                  <ContactForm />
                </NavBarPopover>
              </div>

              {isAuthenticated ? (
                <>
                  <div>
                    <p className="nav-bar-link">{currentUser.email}</p>
                  </div>
                  <div>
                    <button type="button" onClick={logOut} className="nav-bar-link">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="nav-bar-link">
                    <NavBarPopover title="Sign in">
                      <LoginForm />
                    </NavBarPopover>
                  </div>
                  <div>
                    <Link to={routes.signup()} className="nav-bar-link">
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </Popover.Group>
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
                <div>
                  <Link to={routes.contact()} className="nav-bar-link">
                    Contact Us
                  </Link>
                </div>
                {isAuthenticated ? (
                  <div>
                    <p className="nav-bar-link">{currentUser.email}</p>
                    <div className="flex justify-end">
                      <button type="button" onClick={logOut} className="nav-bar-link">
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <Link to={routes.login()} className="nav-bar-link">
                        Sign In
                      </Link>
                    </div>
                    <div>
                      <Link to={routes.signup()} className="nav-bar-link">
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
