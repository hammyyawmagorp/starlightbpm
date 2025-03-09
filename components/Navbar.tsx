'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import NavbarOptions from './NavbarOptions'
import Hamburger from './Hamburger'
import OutlineBtn from '@/components/OutlineBtn'

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

  // Debounced resize event handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (window.innerWidth >= 1024) {
          setIsOpen(false)
        }
      }, 100) // Debounce delay
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
    }
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
        <Link href="/estimator">
          <div className="lg:flexCenter hidden">
            <OutlineBtn>
              <div className="group relative flexCenter gap-2 border hover:border-gray hover:scale-110 hover:text-black bg-logoblue-30 px-5 py-3 text-white transition-all hover:bg-logoblue-50">
                <div className="relative w-7 h-7">
                  <Image
                    src="/estimator.svg"
                    alt="estimate"
                    fill
                    className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <div className="absolute inset-0 flexCenter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src="/dollarsign.svg"
                      alt="dollar sign"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <label className="bold-16 whitespace-nowrap cursor-pointer">
                  Free Estimate
                </label>
              </div>
            </OutlineBtn>
          </div>
        </Link>

        <div className="lg:hidden">
          <Hamburger toggleMenu={toggleMenu} isOpen={isOpen} />
        </div>
      </nav>

      {/* Only render the mobile menu when open to prevent flickering */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full site-bg text-white shadow-lg transition-all duration-300 origin-top z-50 mt-[10rem] pb-3">
          <NavbarOptions />
          <Link href="/estimator">
            <div className="lg:flexCenter flexCenter pt-2">
              <OutlineBtn>
                <div className="group relative flexCenter gap-2 border hover:border-gray hover:scale-110 hover:text-black bg-logoblue-30 px-5 py-3 text-white transition-all hover:bg-logoblue-50">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/estimator.svg"
                      alt="estimate"
                      fill
                      className="object-contain transition-opacity duration-300 group-hover:opacity-0"
                    />
                    <div className="absolute inset-0 flexCenter opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Image
                        src="/dollarsign.svg"
                        alt="dollar sign"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <label className="bold-16 whitespace-nowrap cursor-pointer">
                    Free Estimate
                  </label>
                </div>
              </OutlineBtn>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
