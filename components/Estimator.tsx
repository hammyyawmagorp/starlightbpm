//todo: add a line with address + city + postalcode

'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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

    if (!isEmailValid || !isPhoneValid || !isNameValid) {
      console.log('Error! Please fill in all required fields.')
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
        console.log('Error submitting form:', data.message)
        setShowPrivacyText(true)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setShowPrivacyText(true)
      setIsSubmitting(false)
    }
  }

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPostalCode(value)
    if (value) {
      setShowPostalError(!value.match(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/))
    } else {
      setShowPostalError(false)
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
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setBuildingType('residential')}
                className={`px-4 py-2 rounded-sm transition-all ${
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
                className={`px-4 py-2 rounded-sm transition-all ${
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
                    className={`w-64 h-2 bg-logobrown-10 outline-2 rounded-lg appearance-none cursor-pointer accent-logoblue-10 ${
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
                    className={`w-32 p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none text-center mx-auto
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
                    placeholder="Windows ?"
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
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setStoryType('one')}
                    disabled={isSuccessfulEstimate(estimate)}
                    className={`px-4 py-2 rounded-sm transition-all ${
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
                    className={`px-4 py-2 rounded-sm transition-all ${
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
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setCleaningType('full')}
                    disabled={isSuccessfulEstimate(estimate)}
                    className={`px-4 py-2 rounded-sm transition-all ${
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
                    className={`px-4 py-2 rounded-sm transition-all ${
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
                  className={`px-6 py-2 transition-all font-semibold uppercase ${
                    isSuccessfulEstimate(estimate) || isCalculating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-logoblue-30 text-yellow-logo shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black'
                  }`}
                >
                  {isCalculating ? 'Calculating...' : 'Calculate'}
                </button>
                {estimate && (
                  <div>
                    <button
                      onClick={resetTool}
                      className="px-4 py-1.5 bg-yellow-logo text-black hover:bg-logobrown-10 hover:text-white rounded-sm transition-all font-inter text-sm"
                    >
                      Retry Estimate
                    </button>
                  </div>
                )}
              </div>

              {estimate && typeof estimate === 'string' && (
                <div className="mt-6 p-4 bg-white rounded-sm shadow-md text-center mb-5 pb-5 font-inter">
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
              className="group relative px-8 py-4 bg-logoblue-30 text-white text-xl font-bold rounded-xl transition-all hover:bg-logoblue-50 hover:text-black hover:shadow-[0_0_30px_15px_rgba(255,215,0,0.7)] animate-[shadowPulse_2s_ease-in-out_infinite] hover:animate-none"
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
          <div className="text-center">
            <p className="text-lg text-center font-bold  text-logoblue-30 flexCenter pt-5 mt-3 pb-3 mb-1">
              Thanks! We&apos;ll reach out soon.
            </p>
            <p className="text-lg text-center font-bold text-logoblue-30 flexCenter mb-4">
              Your Quote Confirmation number:
            </p>
            <p className="text-3xl text-center text-logobrown-10 flexCenter font-mono tracking-widest pb-2">
              {confNumber}
            </p>
          </div>
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

            <form onSubmit={handleSubmit}>
              <div className="mb-6 p-4 bg-logoblue-light rounded-lg border border-logoblue-30 border-radius-lg text-center">
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

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-lg mb-2 font-semibold"
                >
                  Name/Company: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setNameTouched(true)}
                  className={`w-full max-w-[600px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none 
                  ${
                    nameTouched && !isNameValid
                      ? 'border-red-500 text-red-600'
                      : ''
                  }
                  ${
                    nameTouched && isNameValid
                      ? 'border-green-500'
                      : 'border-logoblue-30'
                  }
                `}
                  required
                />
                {nameTouched && !name.match(/^[a-zA-Z\s]+$/) && (
                  <p className="mt-1 text-sm text-red-600">
                    Name cannot contain numbers.
                  </p>
                )}
                {nameTouched && name.length < 2 && (
                  <p className="mt-1 text-sm text-red-600">
                    Name must be at least 2 characters long.
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-lg mb-2 font-semibold"
                >
                  Street Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your street address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onBlur={() => setAddressTouched(true)}
                  className={`w-full max-w-[600px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none 
                  ${
                    addressTouched && !isAddressValid
                      ? 'border-red-500 text-red-600'
                      : ''
                  }
                  ${
                    addressTouched && isAddressValid
                      ? 'border-green-500'
                      : 'border-logoblue-30'
                  }
                `}
                />
                {addressTouched && !isAddressValid && (
                  <p className="mt-1 text-sm text-red-600">
                    Please enter a valid street address (minimum 5 characters).
                  </p>
                )}
              </div>

              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="block text-lg mb-2 font-semibold"
                  >
                    City:
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter your city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onBlur={() => setCityTouched(true)}
                    className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none
                    ${
                      cityTouched && !isCityValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      cityTouched && isCityValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                  `}
                  />
                  {cityTouched && !city.match(/^[a-zA-Z\s]+$/) && (
                    <p className="mt-1 text-sm text-red-600">
                      City name cannot contain numbers or special characters.
                    </p>
                  )}
                  {cityTouched && city.length < 2 && (
                    <p className="mt-1 text-sm text-red-600">
                      City name must be at least 2 characters long.
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="postalCode"
                    className="block text-lg mb-2 font-semibold"
                  >
                    Postal Code:
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    placeholder="Postal Code..."
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    onBlur={() => setPostalCodeTouched(true)}
                    className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none
                    ${showPostalError ? 'border-red-500 text-red-600' : ''}
                    ${
                      postalCodeTouched && isPostalCodeValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                  `}
                  />
                  {showPostalError && (
                    <p className="mt-1 text-sm text-red-600">
                      Please enter a valid postal code (e.g., A1A 1A1)
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="email"
                    className="block text-lg mb-2 font-semibold"
                  >
                    Email Address: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none
                    ${
                      emailTouched && !isEmailValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      emailTouched && isEmailValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                  `}
                    required
                  />
                  {emailTouched && !isEmailValid && (
                    <p className="mt-1 text-sm text-red-600">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="phone"
                    className="block text-lg mb-2 font-semibold"
                  >
                    Phone Number: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone #..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setPhoneTouched(true)}
                    className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none
                    ${
                      phoneTouched && !isPhoneValid
                        ? 'border-red-500 text-red-600'
                        : ''
                    }
                    ${
                      phoneTouched && isPhoneValid
                        ? 'border-green-500'
                        : 'border-logoblue-30'
                    }
                  `}
                    required
                  />
                  {phoneTouched && phone.replace(/\D/g, '').length < 10 && (
                    <p className="mt-1 text-sm text-red-600">
                      Phone number must be at least 10 digits.
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-lg mb-2 font-semibold"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about the work..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full max-w-[700px] h-40 sm:h-48 p-2 border border-logoblue-30 rounded-sm hover:bg-logobrown-20"
                  required
                />
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
