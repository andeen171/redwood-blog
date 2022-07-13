import { Fragment } from 'react'

import { Popover, Transition } from '@headlessui/react'

interface Props {
  children?: React.ReactNode
  title?: string
}

const ContactPopover = ({ children, title }: Props) => {
  return (
    <>
      <Popover className="relative">
        <Popover.Button className="nav-bar-link">{title}</Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-xl md:max-w-xs sm:px-0 lg:left-1/2 lg:-translate-x-1/2">
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-slate-800 text-white p-4">
              {children}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  )
}

export default ContactPopover
