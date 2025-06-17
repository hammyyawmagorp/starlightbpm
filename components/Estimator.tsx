//todo: add a line with address + city + postalcode

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type StoryType = 'one' | 'two'
type CleaningType = 'full' | 'exterior'
type BuildingType = 'residential' | 'commercial' | null

type EstimateType =
  | {
      message: string
      priceRange: string
    }
  | string

export default function Estimator() {
  const [numWindows, setNumWindows] = useState<string>('')
  const maxWindows = 100 // You can adjust this maximum value
  const [storyType, setStoryType] = useState<StoryType>('one')
  const [cleaningType, setCleaningType] = useState<CleaningType>('full')
  const [estimate, setEstimate] = useState<EstimateType>('')
  const [buildingType, setBuildingType] = useState<BuildingType>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  // Contact form states
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
  const [confNumber, setConfNumber] = useState<string>('')
  const [windowsTouched, setWindowsTouched] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isMessageFocused, setIsMessageFocused] = useState(false)

  // Add useEffect for auto-scroll
  useEffect(() => {
    if (showContactForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [showContactForm])

  const resetTool = () => {
    setNumWindows('')
    setStoryType('one')
    setCleaningType('full')
    setEstimate('')
    setShowContactForm(false)
    setWindowsTouched(false)
    if (buildingType !== 'residential') {
      setBuildingType(null)
    }
    // Scroll to the top of the page with a longer duration
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleWindowsChange = (value: string) => {
    const num = parseInt(value)
    if (num > maxWindows) {
      setNumWindows(maxWindows.toString())
    } else {
      setNumWindows(value)
    }
  }

  const isWindowsValid =
    numWindows !== '' &&
    !isNaN(parseInt(numWindows)) &&
    parseInt(numWindows) > 0

  const calculateEstimate = async () => {
    if (!isWindowsValid) {
      setWindowsTouched(true)
      return
    }

    try {
      setIsCalculating(true)
      const response = await fetch('/api/calculate-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          windowCount: parseInt(numWindows),
          storyType,
          cleaningType,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate estimate')
      }

      const data = await response.json()
      setEstimate(data)

      setTimeout(() => {
        const quoteElement = document.querySelector('.text-center.mt-8.mb-12')
        if (quoteElement) {
          quoteElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    } catch {
      setEstimate('Sorry, something went wrong. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  const isSuccessfulEstimate = (est: EstimateType): boolean => {
    return typeof est === 'object' && est !== null
  }

  // Contact form validation
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

    // Format estimate details
    const estimateDetails =
      typeof estimate === 'object'
        ? {
            message: estimate.message,
            priceRange: estimate.priceRange,
            windows: numWindows,
            type: cleaningType === 'full' ? 'Full Clean' : 'Exterior Only',
            stories: storyType === 'one' ? 'One Story' : 'Two or More Stories',
          }
        : null

    const formData = {
      name,
      email,
      phone,
      address: address || null,
      city: city || null,
      postalCode: postalCode || null,
      message,
      estimateDetails: estimateDetails ? JSON.stringify(estimateDetails) : null,
    }

    setIsSubmitting(true)
    setShowPrivacyText(false)

    try {
      const response = await fetch('/api/submitEstimator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setTimeout(() => {
          setIsSubmitting(false)
          setIsSubmitted(true)
          setConfNumber(data.confNumber)

          setName('')
          setEmail('')
          setPhone('')
          setPostalCode('')
          setMessage('')
        }, 1500)
      } else {
        setShowPrivacyText(true)
        setIsSubmitting(false)
      }
    } catch {
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

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          showContactForm ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'
        }`}
      >
        <div className="relative">
          <h1 className="text-3xl font-bold text-logoblue-30 text-center mb-8">
            Free Window Cleaning Estimator
          </h1>
        </div>

        <div className="space-y-6 w-full max-w-md mx-auto mb-5 pb-5 font-inter">
          <div className="text-center">
            <label className="block text-lg font-semibold mb-2">
              Type of Property:
            </label>
            <div className="flex flex-col min-[340px]:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setBuildingType('residential')}
                className={`px-4 py-2 rounded-sm transition-all w-fit ${
                  buildingType === 'residential'
                    ? 'bg-logoblue-30'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                <span
                  className={
                    buildingType === 'residential'
                      ? 'text-white animate-pulse'
                      : ''
                  }
                >
                  Residential
                </span>
              </button>
              <button
                onClick={() => setBuildingType('commercial')}
                className={`px-4 py-2 rounded-sm transition-all w-fit ${
                  buildingType === 'commercial'
                    ? 'bg-logoblue-30'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                <span
                  className={
                    buildingType === 'commercial'
                      ? 'text-white animate-pulse'
                      : ''
                  }
                >
                  Commercial/Business
                </span>
              </button>
            </div>
          </div>

          {buildingType === 'commercial' ? (
            <div className="text-center space-y-4 mb-5 pb-5">
              <p className="text-md text-logobrown-10 mb-5 pb-5">
                Sorry! Commercial and Business quotes are not available through
                our estimator at this time.
              </p>
              <p className="text-lg mb-5 pb-5">
                Please get in touch with us for a custom quote tailored to your
                businesses needs.
              </p>
              <Link href="/contact">
                <button className="px-6 py-2 bg-logoblue-30 text-yellow-logo transition-all shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black font-semibold uppercase">
                  Contact Us
                </button>
              </Link>
            </div>
          ) : buildingType === 'residential' ? (
            <>
              <div className="text-center">
                <label className="block text-lg font-semibold mb-2">
                  Number of Windows: <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col items-center gap-2">
                  <input
                    type="range"
                    min="1"
                    max={maxWindows}
                    value={numWindows || '0'}
                    onChange={(e) => {
                      handleWindowsChange(e.target.value)
                      setWindowsTouched(true)
                    }}
                    disabled={isSuccessfulEstimate(estimate)}
                    style={{
                      background: `linear-gradient(to right, #8B4513 ${
                        ((parseInt(numWindows || '0') - 1) / (maxWindows - 1)) *
                        100
                      }%, #3a5e9d ${
                        ((parseInt(numWindows || '0') - 1) / (maxWindows - 1)) *
                        100
                      }%)`,
                    }}
                    className={`w-64 h-1 outline-2 rounded-lg appearance-none cursor-pointer accent-logoblue-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-logobrown-10 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-logobrown-10 [&::-moz-range-thumb]:border-0 mb-4 mt-4 ${
                      isSuccessfulEstimate(estimate)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  />
                  <input
                    type="number"
                    value={numWindows}
                    onChange={(e) => {
                      handleWindowsChange(e.target.value)
                      setWindowsTouched(true)
                    }}
                    onBlur={() => setWindowsTouched(true)}
                    disabled={isSuccessfulEstimate(estimate)}
                    className={`w-16 p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none text-center mx-auto font-inter font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                      ${
                        windowsTouched && !isWindowsValid
                          ? 'border-red-500 text-red-600'
                          : ''
                      }
                      ${
                        windowsTouched && isWindowsValid
                          ? 'border-green-500'
                          : 'border-logoblue-30'
                      }
                      ${
                        isSuccessfulEstimate(estimate)
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }
                    `}
                    min="1"
                    max={maxWindows}
                    required
                  />
                  {windowsTouched && !isWindowsValid && (
                    <p className="mt-1 text-sm text-red-600">
                      Number of windows is required
                    </p>
                  )}
                </div>
              </div>

              <div className="text-center">
                <label className="block text-lg font-semibold mb-2">
                  House Type:
                </label>
                <div className="flex flex-col min-[340px]:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => setStoryType('one')}
                    disabled={isSuccessfulEstimate(estimate)}
                    className={`px-4 py-2 rounded-sm transition-all w-fit ${
                      storyType === 'one'
                        ? 'bg-logoblue-30'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    } ${
                      isSuccessfulEstimate(estimate)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <span
                      className={
                        storyType === 'one' ? 'text-white animate-pulse' : ''
                      }
                    >
                      One Story
                    </span>
                  </button>
                  <button
                    onClick={() => setStoryType('two')}
                    disabled={isSuccessfulEstimate(estimate)}
                    className={`px-4 py-2 rounded-sm transition-all w-fit ${
                      storyType === 'two'
                        ? 'bg-logoblue-30'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    } ${
                      isSuccessfulEstimate(estimate)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <span
                      className={
                        storyType === 'two' ? 'text-white animate-pulse' : ''
                      }
                    >
                      Two or More Stories
                    </span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <label className="block text-lg font-semibold mb-2">
                  Cleaning Type:
                </label>
                <div className="flex flex-col min-[340px]:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => setCleaningType('full')}
                    disabled={isSuccessfulEstimate(estimate)}
                    className={`px-4 py-2 rounded-sm transition-all w-fit ${
                      cleaningType === 'full'
                        ? 'bg-logoblue-30'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    } ${
                      isSuccessfulEstimate(estimate)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <span
                      className={
                        cleaningType === 'full'
                          ? 'text-white animate-pulse'
                          : ''
                      }
                    >
                      Full Clean
                    </span>
                  </button>
                  <button
                    onClick={() => setCleaningType('exterior')}
                    disabled={isSuccessfulEstimate(estimate)}
                    className={`px-4 py-2 rounded-sm transition-all w-fit ${
                      cleaningType === 'exterior'
                        ? 'bg-logoblue-30'
                        : 'bg-gray-200 text-black hover:bg-gray-300'
                    } ${
                      isSuccessfulEstimate(estimate)
                        ? 'opacity-50 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    <span
                      className={
                        cleaningType === 'exterior'
                          ? 'text-white animate-pulse'
                          : ''
                      }
                    >
                      Exterior Only
                    </span>
                  </button>
                </div>
              </div>

              <div className="text-center space-y-4">
                <button
                  onClick={calculateEstimate}
                  disabled={isSuccessfulEstimate(estimate) || isCalculating}
                  className={`px-6 py-2 transition-all duration-500 ease-in-out font-semibold uppercase ${
                    isSuccessfulEstimate(estimate) || isCalculating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                      : 'bg-logoblue-30 text-yellow-logo shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black'
                  }`}
                >
                  {isCalculating ? 'Calculating...' : 'Calculate'}
                </button>
                {estimate && (
                  <div>
                    <button
                      onClick={resetTool}
                      className="px-4 py-1.5 bg-yellow-logo text-black hover:bg-logobrown-10 hover:text-white rounded-sm transition-all duration-500 ease-in-out font-inter text-sm"
                    >
                      Retry Estimate
                    </button>
                  </div>
                )}
              </div>

              {estimate && typeof estimate === 'string' && (
                <div className="mt-6 p-4 bg-white rounded-sm shadow-md text-center mb-5 pb-5 font-inter transition-all duration-500 ease-in-out">
                  <p className="text-lg mb-4">{estimate}</p>
                </div>
              )}
            </>
          ) : null}
        </div>

        {isSuccessfulEstimate(estimate) && (
          <div className="text-center mt-8 mb-12">
            <p className="text-lg font-semibold text-logoblue-30 mb-4">
              {typeof estimate === 'object' && estimate.message}
            </p>
            <p className="text-2xl font-bold text-logoblue-30 mb-6">
              {typeof estimate === 'object' && estimate.priceRange}
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="group relative px-8 py-4 bg-logoblue-30 text-white text-xl font-bold transition-all hover:bg-yellow-logo hover:text-black hover:shadow-[0_0_30px_15px_rgba(255,215,0,0.7)] animate-[shadowPulse_2s_ease-in-out_infinite] hover:animate-none"
            >
              <span>Book Now!</span>
            </button>
          </div>
        )}
      </div>

      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          showContactForm
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 h-0 overflow-hidden'
        }`}
      >
        {isSubmitted ? (
          <motion.div
            className="text-center"
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
              Thanks! We&apos;ll reach out soon.
            </motion.p>
            <motion.p
              className="text-lg text-center font-bold text-logoblue-30 flexCenter mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Your Quote Confirmation number:
            </motion.p>
            <motion.p
              className="text-3xl text-center text-logobrown-10 flexCenter font-mono tracking-widest pb-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              {confNumber}
            </motion.p>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl mx-auto">
            <div className="flex flex-col items-center mb-6">
              <h1 className="font-bold text-logoblue-30 text-4xl mb-4">
                Booking Information
              </h1>
              <button
                onClick={resetTool}
                className="px-4 py-2 bg-yellow-logo text-black hover:bg-logobrown-10 hover:text-white rounded-sm transition-all font-inter"
              >
                Retry
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              All <span className="text-red-500">*</span> marked fields are
              required
            </p>

            <form
              onSubmit={handleSubmit}
              className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12"
            >
              <div className="mb-6 p-4 bg-logoblue-light rounded-lg border border-logoblue-30 border-radius-lg text-center pb-4">
                <h2 className="text-xl font-semibold text-logoblue-30 mb-2">
                  Your Estimate Details:
                </h2>
                {typeof estimate === 'object' && (
                  <>
                    <p className="text-lg mb-2">{estimate.message}</p>
                    <p className="text-lg font-bold text-logobrown-10">
                      {estimate.priceRange}
                    </p>
                  </>
                )}
                <div className="text-sm text-gray-600 mt-2">
                  <p>Windows: {numWindows}</p>
                  <p>
                    Type:{' '}
                    {cleaningType === 'full' ? 'Full Clean' : 'Exterior Only'}
                  </p>
                  <p>
                    Stories:{' '}
                    {storyType === 'one' ? 'One Story' : 'Two or More Stories'}
                  </p>
                </div>
              </div>

              <div className="mb-8 pt-5">
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
                    (formSubmitted || (nameTouched && name.length > 0)) &&
                    !isNameValid
                      ? 'border-red-500 text-red-600'
                      : ''
                  }
                  ${
                    (formSubmitted || (nameTouched && name.length > 0)) &&
                    isNameValid
                      ? 'border-green-500'
                      : 'border-logoblue-30'
                  }
                    peer
                `}
                    required
                  />
                  <label
                    htmlFor="name"
                    className="absolute text-base sm:text-lg font-medium text-logoblue-30 duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                  >
                    Name/Company <span className="text-red-500 text-sm">*</span>
                  </label>
                </div>
                {(formSubmitted || (nameTouched && name.length > 0)) &&
                  !name.match(/^[a-zA-Z\s]+$/) && (
                    <p className="mt-1 text-sm text-red-600">
                      Name cannot contain numbers.
                    </p>
                  )}
                {(formSubmitted || (nameTouched && name.length > 0)) &&
                  name.length < 2 && (
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
                    (formSubmitted || (addressTouched && address.length > 0)) &&
                    !isAddressValid
                      ? 'border-red-500 text-red-600'
                      : ''
                  }
                  ${
                    (formSubmitted || (addressTouched && address.length > 0)) &&
                    isAddressValid
                      ? 'border-green-500'
                      : 'border-logoblue-30'
                  }
                    peer
                `}
                    required
                  />
                  <label
                    htmlFor="address"
                    className="absolute text-base sm:text-lg font-medium text-logoblue-30 duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                  >
                    Street Address{' '}
                    <span className="text-red-500 text-sm">*</span>
                  </label>
                </div>
                {(formSubmitted || (addressTouched && address.length > 0)) &&
                  !isAddressValid && (
                    <p className="mt-1 text-sm text-red-600">
                      Please enter a valid street address (minimum 5
                      characters).
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
                      className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                    ${
                      (formSubmitted || (cityTouched && city.length > 0)) &&
                      !isCityValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      (formSubmitted || (cityTouched && city.length > 0)) &&
                      isCityValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                      peer
                  `}
                      required
                    />
                    <label
                      htmlFor="city"
                      className="absolute text-base sm:text-lg font-medium text-logoblue-30 duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                    >
                      City <span className="text-red-500 text-sm">*</span>
                    </label>
                  </div>
                  {(formSubmitted || (cityTouched && city.length > 0)) &&
                    !city.match(/^[a-zA-Z\s]+$/) && (
                      <p className="mt-1 text-sm text-red-600">
                        City name cannot contain numbers or special characters.
                      </p>
                    )}
                  {(formSubmitted || (cityTouched && city.length > 0)) &&
                    city.length < 2 && (
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
                      className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                      ${
                        (formSubmitted ||
                          (postalCodeTouched && postalCode.length > 0)) &&
                        showPostalError
                          ? 'border-red-500 text-red-600'
                          : ''
                      }
                    ${
                      (formSubmitted ||
                        (postalCodeTouched && postalCode.length > 0)) &&
                      isPostalCodeValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                      peer
                  `}
                    />
                    <label
                      htmlFor="postalCode"
                      className="absolute text-base sm:text-lg font-medium text-logoblue-30 duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                    >
                      Postal Code
                    </label>
                  </div>
                  {(formSubmitted ||
                    (postalCodeTouched && postalCode.length > 0)) &&
                    showPostalError && (
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
                      className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                    ${
                      (formSubmitted || (emailTouched && email.length > 0)) &&
                      !isEmailValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      (formSubmitted || (emailTouched && email.length > 0)) &&
                      isEmailValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                      peer
                  `}
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-base sm:text-lg font-medium text-logoblue-30 duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                    >
                      Email Address{' '}
                      <span className="text-red-500 text-sm">*</span>
                    </label>
                  </div>
                  {(formSubmitted || (emailTouched && email.length > 0)) &&
                    !isEmailValid && (
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
                      className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none font-inter
                    ${
                      (formSubmitted || (phoneTouched && phone.length > 0)) &&
                      !isPhoneValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      (formSubmitted || (phoneTouched && phone.length > 0)) &&
                      isPhoneValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                      peer
                  `}
                      required
                    />
                    <label
                      htmlFor="phone"
                      className="absolute text-base sm:text-lg font-medium text-logoblue-30 duration-300 transform -translate-y-1/2 scale-[0.85] -top-3 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-[-1rem] peer-focus:scale-[0.85] peer-focus:-translate-y-1/2 start-1"
                    >
                      Phone Number{' '}
                      <span className="text-red-500 text-sm">*</span>
                    </label>
                  </div>
                  {(formSubmitted || (phoneTouched && phone.length > 0)) &&
                    phone.replace(/\D/g, '').length < 10 && (
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
                    className="w-full max-w-[700px] h-40 sm:h-48 p-2 border border-logoblue-30 rounded-sm hover:bg-logobrown-20 font-inter peer"
                    required
                  />
                  <label
                    htmlFor="message"
                    className={`absolute text-base sm:text-lg font-medium text-logoblue-30 duration-300 transform scale-[0.85] -top-5 z-10 origin-[0] px-2 peer-focus:text-logoblue-30 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-[-2rem] peer-focus:scale-[0.85] peer-focus:translate-y-0 start-1 ${
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
          </div>
        )}
      </div>
    </div>
  )
}
