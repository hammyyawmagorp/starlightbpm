import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flexCenter flex-col py-20">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg my-5 pb-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-black font-bold hover:underline pb-2 hover:text-white"
      >
        <button className="bg-sky-500 hover:bg-sky-700 rounded-lg p-3">
          Go to Homepage
        </button>
      </Link>
      <Image
        src="/404error.png"
        alt="404 Error"
        width={600}
        height={600}
      ></Image>
    </div>
  )
}
