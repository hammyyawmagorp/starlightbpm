import Link from 'next/link'

import ImageCarousel from '@/components/ImageCarousel'

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center max-container padding-container pt-5 mt-5">
      <div className="w-full md:w-1/2 p-6 ">
        <h1 className="text-6xl font-bebas pb-3">
          Starlight Building Maintenance
        </h1>
        <h2 className="text-2xl font-bold font-inter pb-3 text-gray-50 italic">
          From windows to waste removal, we’ve got you covered
        </h2>
        <p className="text-lg mt-4">
          Whether you need spotless windows, thorough office cleaning, or
          reliable waste and carcass removal, our family-owned business offers a
          wide range of cleaning and maintenance services. With over 15 years of
          experience, we pride ourselves on being your go-to team for both
          routine cleaning and specialized property care. No job is too big or
          small—we approach every task with the same dedication and attention to
          detail that has earned us the trust of our clients.
        </p>
        <div className="flexCenter gap-4 pt-4">
          <Link href="/estimator">
            <button
              className="flexCenter gap-2 rounded-full border btn_dark_gray hover:bg-logoblue-10 hover:border-gray hover:scale-110 hover:text-yellow-logo"
              type="button"
            >
              <label className="bold-16 whitespace-nowrap cursor-pointer ">
                Free Estimate
              </label>
            </button>
          </Link>
          <Link href="/about-us">
            <button
              className="flexCenter gap-2 rounded-full border btn_lightblue  hover:scale-110 hover:btn_dark_gray"
              type="button"
            >
              <label className="bold-16 whitespace-nowrap cursor-pointer ">
                Why Trust Us
              </label>
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-6 rounded-lg">
        <ImageCarousel />
      </div>
    </section>
  )
}
