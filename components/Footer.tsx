'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()

  return (
    <footer className="flexCenter mt-20 bg-gradient-to-b from-transparent via-logoblue-30/10 to-logoblue-30/25 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="padding-container max-container flex w-full flex-col gap-3 pt-8">
        <div className="flex flex-col items-start justify-center gap-[10%] mt-2 md:flex-row">
          <Link href="/" className="mb-10">
            <Image
              src="/sbmicon.png"
              alt="Starlight Building Maintenance Icon"
              width={65}
              height={65}
              priority={true}
              loading="eager"
              unoptimized={true}
              className="object-contain hover:scale-110 transition-transform"
            />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            <div className="flex-1 flex justify-center">
              <div>
                <h4 className="bold-18 whitespace-nowrap pb-3 text-center">
                  Learn More
                </h4>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div className="hover:scale-110">
                    <Link
                      href="/"
                      className="font-normal hover:text-logobrown-10 hover:font-semibold"
                    >
                      Home
                    </Link>
                  </div>
                  {pathname !== '/services' && (
                    <div className="hover:scale-110">
                      <Link
                        href="/services"
                        className="font-normal hover:text-logobrown-10 hover:font-semibold"
                      >
                        Our Services
                      </Link>
                    </div>
                  )}
                  {pathname !== '/contact' && (
                    <div className="hover:scale-110">
                      <Link
                        href="/contact"
                        className="font-normal hover:text-logobrown-10 hover:font-semibold"
                      >
                        Contact Us
                      </Link>
                    </div>
                  )}
                  <div className="hover:scale-110">
                    <Link
                      href="/privacy"
                      className="font-normal hover:text-logobrown-10 hover:font-semibold"
                    >
                      Privacy Policy
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div>
                <h4 className="bold-18 whitespace-nowrap pb-3 text-center">
                  Service Area
                </h4>
                <div className="text-center">
                  <p className="text-logoblue-30 font-semibold mb-2">
                    Greater Toronto Area (GTA)
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Brampton & Surrounding Areas
                  </p>
                  <p className="text-sm text-gray-600">Ontario, Canada</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <h4 className="bold-18 whitespace-nowrap">Follow Us</h4>
                <ul className="regular-14 flex gap-4 text-gray-30">
                  <li>
                    <Link href="https://facebook.com" target="_blank">
                      <Image
                        src="/facebook.svg"
                        alt="Facebook"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link href="https://instagram.com" target="_blank">
                      <Image
                        src="/instagram.svg"
                        alt="Instagram"
                        width={24}
                        height={24}
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-logoblue-30 via-yellow-logo to-logobrown-10"></div>
        <p className="text-l w-full text-center text-logobrown-10">
          © {new Date().getFullYear()} Starlight Building & Property Maintenance
          Inc. All rights reserved.
        </p>
        <p className="text-xs text-center text-logobrown-10 pb-5">
          Website Designed & Distributed by ©Zarik Tech
        </p>
      </div>
    </footer>
  )
}

export default Footer
