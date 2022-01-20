import { useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const [isMenuAccountOpen, setIsMenuAccountOpen] = useState(false)
  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex flex-col flex-1 w-full">
          <Header
            isMenuAccountOpen={isMenuAccountOpen}
            setIsMenuAccountOpen={setIsMenuAccountOpen}
          />
          <main className="h-full pb-16 overflow-y-auto">{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout
