import Image from 'next/image'

const ContactImages = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      <div className="flex flex-col items-center">
        <Image
          src="/qualityservice.png"
          alt="Quality service"
          width={75}
          height={100}
          className="w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] h-auto object-contain rounded-lg"
        />
        <p className="text-2xl font-semibold text-center mt-3">Quality</p>
      </div>

      <div className="flex flex-col items-center">
        <Image
          src="/localbusiness.png"
          alt="Family-owned local business"
          width={75}
          height={100}
          className="w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] h-auto object-contain rounded-lg"
        />
        <p className="text-2xl font-semibold text-center mt-3">
          Family-Owned Local Business
        </p>
      </div>

      <div className="flex flex-col items-center">
        <Image
          src="/trusted.png"
          alt="Trusted team"
          width={75}
          height={100}
          className="w-full max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] max-h-[200px] h-auto object-contain rounded-lg"
        />
        <p className="text-2xl font-semibold text-center mt-3">Trusted</p>
      </div>
    </div>
  )
}

export default ContactImages
