import Link from 'next/link'
import Image from 'next/image'
import OutlineBtn from '@/components/OutlineBtn'

export default function NotFound() {
  return (
    <div className="flexCenter flex-col py-20">
      <h1 className="text-4xl font-bold text-center">
        Whoops! <p className="pt-3">404 Error - Page Not Found</p>
      </h1>
      <p className="text-lg my-5 pb-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-white font-bold ">
        <OutlineBtn>
          <div className="bg-logoblue-50 p-3 hover:scale-110">
            Go to Homepage
          </div>
        </OutlineBtn>
      </Link>
      <Image
        src="/404error.png"
        alt="404 Error"
        width={600}
        height={600}
        className="pt-8"
      ></Image>
    </div>
  )
}
