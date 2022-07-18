import { Popover, Transition, Menu } from '@headlessui/react'
import { ChevronDownIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/react/solid'

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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight sm:text-center">
                <Link className="nav-bar-link" to={routes.home()}>
                  Redwood Blog
                </Link>
              </h1>
            </div>
            <div className="-my-2 md:hidden">
              <Popover.Button className="bg-white dark:bg-slate-800 text-blue-700 dark:text-sky-500 hover:text-blue-300 hover:dark:text-sky-300 rounded-md p-2 inline-flex items-center justify-center">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-2 items-center justify-end md:flex-1 lg:w-0">
              <div className="nav-bar-link">
                <ThemeToggle />
              </div>
              <div className="nav-bar-link">
                <NavBarPopover title="Contact">
                  <ContactForm />
                </NavBarPopover>
              </div>
              {isAuthenticated ? (
                <>
                  <Menu as="div" className="relative text-left">
                    <Menu.Button className="nav-bar-link flex">
                      {currentUser.name.split(' ')[0]}
                      <ChevronDownIcon className="m-auto ml-1 h-3 w-3" aria-hidden="true" />
                    </Menu.Button>
                    <Transition
                      as={React.Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute text-left right-0 mt-2 w-28 origin-top-right divide-y divide-gray-100 dark:divide-slate-700 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                          <Menu.Item>
                            <button className="nav-bar-link w-full flex group text-right">
                              Profile
                              <UserIcon className="h-4 w-4 m-auto ml-2" />
                            </button>
                          </Menu.Item>
                        </div>
                        <div className="px-1 py-1">
                          <Menu.Item>
                            <button type="button" onClick={logOut} className="nav-bar-link">
                              Logout
                            </button>
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
              ) : (
                <>
                  <div className="nav-bar-link">
                    <NavBarPopover title="Login">
                      <LoginForm />
                    </NavBarPopover>
                  </div>
                  <div>
                    <Link to={routes.signup()} className="nav-bar-link">
                      Register
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
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-slate-800 text-white divide-y-2 divide-gray-50 dark:divide-slate-700">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <ThemeToggle />
                  <div className="-mr-2">
                    <Popover.Button className="bg-transparent text-blue-500 dark:text-sky-500 rounded-md p-2 inline-flex items-center justify-center transition-all">
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
