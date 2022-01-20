import React from 'react'
import Image from 'next/image'

const Header = ({ isMenuAccountOpen, setIsMenuAccountOpen }) => {
  return (
    <>
      <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
        <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
          {/* Search input */}
          <div className="flex justify-center flex-1 lg:mr-32">
            <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500"></div>
          </div>
          <ul className="flex items-center flex-shrink-0 space-x-6">
            <li className="relative">
              <button
                className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
                aria-label="Account"
                aria-haspopup="true"
                onClick={() => setIsMenuAccountOpen(!isMenuAccountOpen)}
              >
                <Image
                  className="object-cover w-8 h-8 rounded-full"
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt=""
                  aria-hidden="true"
                  width={32}
                  height={32}
                />
              </button>
              {isMenuAccountOpen && (
                <>
                  <ul
                    className="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
                    aria-label="submenu"
                  >
                    <li className="flex">
                      <a
                        className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                        href="#"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          aria-hidden="true"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Log out</span>
                      </a>
                    </li>
                  </ul>
                </>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}

export default Header
