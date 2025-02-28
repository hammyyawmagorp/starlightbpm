import Link from 'next/link'
import { NAV_LINKS } from '@/constants'
import OutlineBtn from '@/components/OutlineBtn'

const NavbarOptions = () => {
  return (
    <div>
      <ul className="h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              href={link.href}
              className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
            >
              <OutlineBtn>{link.label}</OutlineBtn>
            </Link>{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavbarOptions
