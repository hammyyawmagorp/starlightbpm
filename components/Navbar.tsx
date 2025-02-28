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

  // Close menu automatically when the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

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
      <nav className="flexBetween max-container padding-container relative z-30 py-5 ">
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
        <Link href="/estimator">
          <div className="lg:flexCenter hidden">
            <button
              className="group relative flexCenter gap-2 rounded-full border btn_dark_blue hover:border-gray hover:scale-110 hover:text-black"
              type="button"
            >
              <div className="relative w-8 h-8">
                <Image
                  src="./estimator.svg"
                  alt="estimate"
                  layout="fill"
                  objectFit="contain"
                  className="transition-opacity duration-300 group-hover:opacity-0"
                />
                <div className="absolute inset-0 flexCenter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src="/dollarsign.svg"
                    alt="dollar sign"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <label className="bold-16 whitespace-nowrap cursor-pointer ">
                Free Estimate
              </label>
            </button>
          </div>
        </Link>
        <div className="lg:hidden">
          {isOpen ? (
            <button
              onClick={toggleMenu}
              className="absolute top-12.5 right-5 transition-all z-40"
            >
              <Image
                src="/close.svg"
                alt="close"
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </button>
          ) : (
            <Hamburger toggleMenu={toggleMenu} />
          )}
        </div>
      </nav>

      {isOpen && (
        <div
          className={`absolute top-16 left-0 w-full site-bg text-white shadow-lg transition-all duration-300 origin-top z-50 ${
            isOpen
              ? 'scale-y-100 opacity-100 visible'
              : 'scale-y-0 opacity-0 invisible'
          } mt-[10rem] pb-3`}
        >
          <NavbarOptions />
          <Link href="/estimator">
            <div className="lg:flexCenter flexCenter pt-2">
              <button
                className="group relative flexCenter gap-2 rounded-full border hover:border-gray hover:scale-110 hover:text-black bg-logoblue-30 px-8 py-4 text-white transition-all hover:bg-logoblue-50"
                type="button"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src="./estimator.svg"
                    alt="estimate"
                    layout="fill"
                    objectFit="contain"
                    className="transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <div className="absolute inset-0 flexCenter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src="/dollarsign.svg"
                      alt="dollar sign"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </div>
                <label className="bold-16 whitespace-nowrap cursor-pointer ">
                  Free Estimate
                </label>
              </button>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
