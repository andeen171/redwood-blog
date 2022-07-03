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
      <header className="relative flex justify-between items-center py-4 px-8 bg-blue-700 dark:bg-sky-500 text-white">
        <h1 className="text-5xl font-semibold tracking-tight">
          <Link className={linkClassNames} to={routes.home()}>
            Redwood Blog
          </Link>
        </h1>
        <nav>
          <ul className="relative flex items-center font-light">
            <ThemeToggle />
            <li>
              <Link className={linkClassNames} to={routes.contact()}>
                Contact
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <div>
                  <button type="button" onClick={logOut} className={linkClassNames}>
                    Logout
                  </button>
                </div>
              ) : (
                <Link to={routes.login()} className={linkClassNames}>
                  Login
                </Link>
              )}
            </li>
          </ul>
          {isAuthenticated && (
            <div className="absolute bottom-1 right-0 mr-12 text-xs text-blue-300">{currentUser.email}</div>
          )}
        </nav>
      </header>
      <main className="max-w-4xl mx-auto p-12">{children}</main>
    </>
  )
}

export default BlogLayout
