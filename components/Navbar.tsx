'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NavbarOptions from './NavbarOptions'
import Hamburger from './Hamburger'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative">
      <nav className="flexBetween max-container padding-container relative z-30 py-5">
        <Link href="/">
          <Image
            src="/sbm-logo-1.svg"
            alt="logo"
            width={300}
            height={300}
            className="pr-2"
          />
        </Link>
        <div className="hidden lg:flexCenter">
          <NavbarOptions />
        </div>

        <div className="lg:hidden">
          <Hamburger toggleMenu={toggleMenu} isOpen={isOpen} />
        </div>
      </nav>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full site-bg text-white shadow-lg transition-all duration-300 origin-top z-50 mt-[10rem] pb-3">
          <NavbarOptions />
        </div>
      )}
    </div>
  )
}

export default Navbar
