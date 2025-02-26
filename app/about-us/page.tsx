import ContactForm from '@/components/ContactForm'
import ContactImages from '@/components/ContactImages'

export default function AboutUs() {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-col ">
      <div className="flex flex-wrap items-center justify-between w-full">
        <div className="w-full lg:w-1/2">
          <h1 className="font-bold text-logoblue-10 flexCenter mb-10 mt-10 text-5xl">
            Who Are We?
          </h1>
          <h2 className="font-ubuntu font-medium italic flexCenter pb-4 text-2xl ">
            Built on Trust—Committed to Excellence
          </h2>
          <div className="text-2xl">
            <p className="mb-5 mt-3">
              Founded in 2009, our family business has been built on trust,
              quality, and dedication. My dad started this company with a
              commitment to providing top-tier cleaning services, and as a
              family, we all played a role in securing contracts with businesses
              and the City of Brampton. When he faced medical complications in
              2012, I stepped in to continue his legacy—honoring existing client
              relationships while building new ones along the way.
            </p>
            <p className="mb-5">
              With <strong> over 15 years</strong> in business, we take pride in
              delivering dependable, high-quality cleaning services that our
              clients can count on. Whether it’s maintaining a commercial
              property, cleaning up after construction, or organizing a
              cluttered space, we approach every job with care and
              professionalism.
            </p>
            <p>
              When you work with us, you’re in trusted hands! Because for us,
              cleaning isn’t just a service, it’s a family tradition.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        {/* <div className="w-full lg:w-1/2 flexCenter text-center "> */}
        <div className="w-full lg:w-1/2 flexCenter text-center">
          <ContactForm />
        </div>
      </div>

      <div className="flex justify-center">
        <ContactImages />
      </div>
    </section>
  )
}
