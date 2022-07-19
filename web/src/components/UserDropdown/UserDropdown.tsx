import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, LogoutIcon, UserIcon } from '@heroicons/react/solid'

interface UserDropdownProps {
  name: string
  logOut: () => void
}

const UserDropdown = ({ name, logOut }: UserDropdownProps) => {
  return (
    <Menu as="div" className="relative text-left">
      <Menu.Button className="nav-bar-link flex">
        {name}
        <ChevronDownIcon className="m-auto ml-1 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute text-left right-0 mt-2 w-30 origin-top-right divide-y divide-gray-100 dark:divide-slate-600 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              <button className="nav-bar-link w-full flex group text-right">
                Profile
                <UserIcon className="h-5 w-5 m-auto ml-1" />
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button type="button" onClick={logOut} className="nav-bar-link w-full flex group text-right">
                Logout
                <LogoutIcon className="h-5 w-5 m-auto ml-1" />
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserDropdown
