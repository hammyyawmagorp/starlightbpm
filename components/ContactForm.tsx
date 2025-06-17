import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

interface ContactFormProps {
  estimate?: string
  service?: string
  windows?: string
  type?: 'full' | 'exterior'
  stories?: 'one' | 'two'
}

export default function ContactForm({
  estimate: propEstimate,
  service: propService,
  windows: propWindows,
  type: propType,
  stories: propStories,
}: ContactFormProps) {
  const [name, setName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [postalCode, setPostalCode] = useState('')
  const [postalCodeTouched, setPostalCodeTouched] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPostalError, setShowPostalError] = useState(false)
  const [showPrivacyText, setShowPrivacyText] = useState(true)
  const [address, setAddress] = useState('')
  const [addressTouched, setAddressTouched] = useState(false)
  const [city, setCity] = useState('')
  const [cityTouched, setCityTouched] = useState(false)
  const [isMessageFocused, setIsMessageFocused] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const searchParams = useSearchParams()
  const urlEstimate = searchParams.get('estimate')
  const urlService = searchParams.get('service')
  const urlWindows = searchParams.get('windows')
  const urlType = searchParams.get('type')
  const urlStories = searchParams.get('stories')

  const estimate = propEstimate || urlEstimate
  const service = propService || urlService
  const windows = propWindows || urlWindows
  const type = propType || (urlType as 'full' | 'exterior' | null)
  const stories = propStories || (urlStories as 'one' | 'two' | null)

  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const isPhoneValid = phone.replace(/\D/g, '').length >= 10
  const isNameValid = name.match(/^[a-zA-Z\s]+$/) && name.length >= 2
  const isPostalCodeValid = postalCode.match(
    /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/
  )
  const isAddressValid = address.length >= 5
  const isCityValid = city.match(/^[a-zA-Z\s]+$/) && city.length >= 2

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)

    if (!isEmailValid || !isPhoneValid || !isNameValid) {
      return
    }

    const formData = {
      name,
      email,
      phone,
      address: address || null,
      city: city || null,
      postalCode: postalCode || null,
      message,
      estimate,
      service,
      windows,
      type,
      stories,
    }

    setIsSubmitting(true)
    setShowPrivacyText(false)

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setTimeout(() => {
          setIsSubmitting(false)
          setIsSubmitted(true)

          setName('')
          setEmail('')
          setPhone('')
          setPostalCode('')
          setMessage('')
        }, 1500)
      } else {
        console.log('Error submitting form:', data.message)
        setShowPrivacyText(true)
      }
    } catch (error) {
      setShowPrivacyText(true)
      setIsSubmitting(false)
    }
  }

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPostalCode(value)
    if (postalCodeTouched) {
      setShowPostalError(!value.match(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/))
    }
  }

  const showNameError = formSubmitted || (nameTouched && name.length > 0)
  const showEmailError = formSubmitted || (emailTouched && email.length > 0)
  const showPhoneError = formSubmitted || (phoneTouched && phone.length > 0)
  const showAddressError =
    formSubmitted || (addressTouched && address.length > 0)
  const showCityError = formSubmitted || (cityTouched && city.length > 0)
  const showPostalCodeError =
    formSubmitted || (postalCodeTouched && postalCode.length > 0)

  return (
    <div className="w-full p-2 m-1">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.p
            className="text-lg text-center font-bold text-logoblue-30 flexCenter pt-5 mt-3 pb-3 mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Thanks! We&apos;ll be in touch soon.
          </motion.p>
          <motion.p
            className="text-lg text-center font-bold text-logoblue-30 flexCenter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            In the meantime, check out our FAQs:
          </motion.p>

          <motion.div
            className="text-center pt-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link href="/FAQs">
              <button className="px-6 py-2 bg-logoblue-30 text-yellow-logo w-fit transition-all shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black font-semibold">
                FAQs
              </button>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12"
        >
          <h1 className="font-bold text-logoblue-30 text-4xl mb-2 text-center">
            Contact Us
          </h1>
          <p className="text-sm text-gray-600 mb-8 text-center">
            All <span className="text-red-500">*</span> marked fields are
            required
          </p>

          {estimate && (
            <div className="mb-6 p-4 bg-logoblue-light rounded-lg border border-logoblue-30 border-radius-lg text-center">
              <h2 className="text-xl font-semibold text-logoblue-30 mb-2">
                Your Estimate Details:
              </h2>
              <p className="text-lg mb-2">{service}</p>
              <p className="text-lg font-bold text-logobrown-10">{estimate}</p>
              <div className="text-sm text-gray-600 mt-2">
                <p>Windows: {windows}</p>
                <p>Type: {type === 'full' ? 'Full Clean' : 'Exterior Only'}</p>
                <p>
                  Stories:{' '}
                  {stories === 'one' ? 'One Story' : 'Two or More Stories'}
                </p>
              </div>
            </div>
          )}

          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setNameTouched(true)}
                className={`w-full p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                  ${
                    showNameError && !isNameValid
                      ? 'border-red-500 text-red-600'
                      : ''
                  }
                  ${
                    showNameError && isNameValid
                      ? 'border-green-500'
                      : 'border-logoblue-30'
                  }
                  peer
                `}
                required
              />
              <label
                htmlFor="name"
                className="absolute text-base sm:text-lg font-semibold duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
              >
                Name/Company <span className="text-red-500 text-sm">*</span>
              </label>
            </div>
            {showNameError && !name.match(/^[a-zA-Z\s]+$/) && (
              <p className="mt-1 text-sm text-red-600">
                Name cannot contain numbers.
              </p>
            )}
            {showNameError && name.length < 2 && (
              <p className="mt-1 text-sm text-red-600">
                Name must be at least 2 characters long.
              </p>
            )}
          </div>

          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                placeholder=" "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => setAddressTouched(true)}
                className={`w-full p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                  ${
                    showAddressError && !isAddressValid
                      ? 'border-red-500 text-red-600'
                      : ''
                  }
                  ${
                    showAddressError && isAddressValid
                      ? 'border-green-500'
                      : 'border-logoblue-30'
                  }
                  peer
                `}
                required
              />
              <label
                htmlFor="address"
                className="absolute text-base sm:text-lg font-semibold duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
              >
                Street Address <span className="text-red-500 text-sm">*</span>
              </label>
            </div>
            {showAddressError && !isAddressValid && (
              <p className="mt-1 text-sm text-red-600">
                Please enter a valid street address (minimum 5 characters).
              </p>
            )}
          </div>

          <div className="mb-8 flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder=" "
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() => setCityTouched(true)}
                  className={`w-full p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                    ${
                      showCityError && !isCityValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      showCityError && isCityValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                    peer
                  `}
                  required
                />
                <label
                  htmlFor="city"
                  className="absolute text-base sm:text-lg font-semibold duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                >
                  City <span className="text-red-500 text-sm">*</span>
                </label>
              </div>
              {showCityError && !city.match(/^[a-zA-Z\s]+$/) && (
                <p className="mt-1 text-sm text-red-600">
                  City name cannot contain numbers or special characters.
                </p>
              )}
              {showCityError && city.length < 2 && (
                <p className="mt-1 text-sm text-red-600">
                  City name must be at least 2 characters long.
                </p>
              )}
            </div>

            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  placeholder=" "
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  onBlur={() => setPostalCodeTouched(true)}
                  className={`w-full p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                    ${
                      showPostalCodeError && showPostalError
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      showPostalCodeError && isPostalCodeValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                    peer
                  `}
                />
                <label
                  htmlFor="postalCode"
                  className="absolute text-base sm:text-lg font-semibold duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                >
                  Postal Code
                </label>
              </div>
              {showPostalCodeError && showPostalError && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid postal code (e.g., A1A 1A1)
                </p>
              )}
            </div>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEmailTouched(true)}
                  className={`w-full p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                    ${
                      showEmailError && !isEmailValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      showEmailError && isEmailValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                    peer
                  `}
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-base sm:text-lg font-semibold duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                >
                  Email Address <span className="text-red-500 text-sm">*</span>
                </label>
              </div>
              {showEmailError && !isEmailValid && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            <div className="flex-1">
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder=" "
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={() => setPhoneTouched(true)}
                  className={`w-full p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                    ${
                      showPhoneError && !isPhoneValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      showPhoneError && isPhoneValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                    peer
                  `}
                  required
                />
                <label
                  htmlFor="phone"
                  className="absolute text-base sm:text-lg font-semibold duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                >
                  Phone Number <span className="text-red-500 text-sm">*</span>
                </label>
              </div>
              {showPhoneError && phone.replace(/\D/g, '').length < 10 && (
                <p className="mt-1 text-sm text-red-600">
                  Phone number must be at least 10 digits.
                </p>
              )}
            </div>
          </div>

          <div className="mb-8 mt-12">
            <div className="relative">
              <textarea
                id="message"
                name="message"
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onFocus={() => setIsMessageFocused(true)}
                onBlur={() => setIsMessageFocused(false)}
                className="w-full h-40 sm:h-48 p-2 border border-logoblue-30 rounded-sm hover:bg-logobrown-20 font-inter peer"
                required
              />
              <label
                htmlFor="message"
                className={`absolute text-base sm:text-lg font-semibold duration-300 transform scale-[0.85] -top-5 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-[-2rem] peer-focus:scale-[0.85] peer-focus:translate-y-0 start-1 ${
                  message.length > 0
                    ? 'top-[-2rem] scale-[0.85] translate-y-0'
                    : ''
                }`}
              >
                <span
                  className={`transition-opacity duration-300 ${
                    isMessageFocused || message.length > 0
                      ? 'opacity-0'
                      : 'opacity-100'
                  }`}
                >
                  Anything Else?
                </span>
                <span
                  className={`absolute left-0 transition-opacity duration-300 ${
                    isMessageFocused || message.length > 0
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  Message
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button className="px-6 py-2 bg-logoblue-30 text-yellow-logo w-fit transition-all shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black font-semibold uppercase">
              {isSubmitting ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent alsign-[-0.125em] motion-reduce:animate-[spin_s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
          {showPrivacyText && !isSubmitted && (
            <div className="text-center mb-2 mt-5 pt-5 font-inter text-xs text-logobrown-10">
              For more information on how your data is handled, visit our{' '}
              <a href="/privacy" className="underline text-red-800 ">
                privacy policy.
              </a>
            </div>
          )}
        </form>
      )}
    </div>
  )
}
