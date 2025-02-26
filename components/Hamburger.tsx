import React from 'react'
import Image from 'next/image'

const Hamburger = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <button onClick={toggleMenu} className="lg:hidden">
      <Image
        src="/menu.svg"
        alt="menu"
        width={30}
        height={30}
        className="cursor-pointer"
      />
    </button>
  )
}

export default Hamburger
