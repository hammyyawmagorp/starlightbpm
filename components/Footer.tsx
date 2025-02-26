import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flexCenter mt-20 bg-gray-500">
      <div className="padding-container max-container flex w-full flex-col gap-3 pt-8">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10">
            <Image src="/sbmicon.png" alt="logo" width={74} height={29} />
          </Link>

          <div className="flex flex-wrap gap-10 sm:justify-between md:flex-1">
            <div>
              <h4 className="bold-18 whitespace-nowrap pb-3">Learn More</h4>
              <ul className="regular-14 flex flex-col gap-4">
                <li>
                  <Link
                    href="/services"
                    className="font-normal hover:text-yellow-logo"
                  >
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="font-normal hover:text-yellow-logo"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="font-normal hover:text-yellow-logo"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-4 md:flex-col lg:flex-row">
                <div className="flex flex-col gap-5">
                  <h4 className="bold-18 whitespace-nowrap">Contact Us</h4>
                  <p className="whitespace-nowrap">
                    Email:
                    <a
                      href="mailto:starlightbpm@gmail.com"
                      className="medium-14 whitespace-nowrap pl-2 text-blue-70 cursor-pointer hover:text-yellow-logo"
                    >
                      starlightbpm@gmail.com
                    </a>
                  </p>
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

        {/* <div className="flexCenter gap-2 text-logobrown-20 font-bold pt-4 text-xl">
          Serving:
          <span className="text-yellow-logo font-light">
            Brampton, Toronto, Mississauga, Caledon, Georgetown and Surrounding
            Areas
          </span>
        </div> */}

        <div className="border bg-logobrown-20"></div>
        <p className="text-l w-full text-center text-yellow-logo">
          Starlight Building Maintenance Inc. | 2025 All Rights Reserved
        </p>
        <p className="text-xs text-center text-yellow-logo pb-5">
          Website Designed & Distributed by ©Zarik Tech
        </p>
      </div>
    </footer>
  )
}

export default Footer
