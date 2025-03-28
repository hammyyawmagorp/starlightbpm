import { useState } from 'react'
import Link from 'next/link'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [phone, setPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [postalCode, setPostalCode] = useState('')
  const [postalCodeTouched, setPostalCodeTouched] = useState(false)
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false) // New state to track submission
  const [isSubmitting, setIsSubmitting] = useState(false) // Track submitting state
  const [showPostalError, setShowPostalError] = useState(false) // Add this new state
  const [showPrivacyText, setShowPrivacyText] = useState(true) // New state for privacy text

  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const isPhoneValid = phone.replace(/\D/g, '').length >= 10
  const isNameValid = name.match(/^[a-zA-Z\s]+$/) && name.length >= 2
  const isPostalCodeValid = postalCode.match(
    /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Show postal error if invalid on submit attempt
    if (!isPostalCodeValid) {
      setShowPostalError(true)
    }

    if (!isEmailValid || !isPhoneValid || !isNameValid || !isPostalCodeValid) {
      console.log('Error! Try again later.')
      return
    }

    const formData = {
      name,
      email,
      phone,
      postalCode,
      message,
    }

    // Log the form data to the console (replace this with your emailJS integration)
    console.log('Form Data:', formData)

    // Set the form to submitting state
    setIsSubmitting(true)
    setShowPrivacyText(false) // Hide privacy text when submitting

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
        // Wait for 1.5 seconds before displaying the success message
        setTimeout(() => {
          setIsSubmitting(false)
          setIsSubmitted(true)

          // Optionally, reset the form after submission
          setName('')
          setEmail('')
          setPhone('')
          setPostalCode('')
          setMessage('')
        }, 1500)
      } else {
        console.log('Error submitting form:', data.message)
        setShowPrivacyText(true) // Show privacy text again if submission fails
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setShowPrivacyText(true) // Show privacy text again if submission fails
    }
  }

  // Add this handler for postal code changes
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPostalCode(value)
    if (value) {
      // Only show error if there's a value
      setShowPostalError(!value.match(/^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/))
    } else {
      setShowPostalError(false)
    }
  }

  return (
    <div className="w-full p-2 m-1">
      {isSubmitted ? (
        <div>
          <p className="text-lg text-center font-bold uppercase text-logoblue-30 flexCenter pt-5 mt-3 pb-3 mb-1">
            Thanks! We&apos;ll be in touch soon
          </p>
          <p className="text-lg text-center font-bold text-logoblue-30 flexCenter">
            Got more questions? Check out our FAQs:
          </p>

          <div className="text-center pt-3">
            <Link href="/FAQs">
              <button className="px-6 py-2 bg-logoblue-30 text-yellow-logo w-fit transition-all shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black font-semibold ">
                FAQs
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1 className="font-bold text-logoblue-30 text-4xl mb-4 text-center">
            Contact Us
          </h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg mb-2 font-semibold">
              Name:
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

          <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-lg mb-2 font-semibold"
              >
                Email Address:
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
                Phone Number:
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
                onChange={handlePostalCodeChange} // Use the new handler
                onBlur={() => setPostalCodeTouched(true)}
                className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-sm hover:bg-logobrown-20 focus:outline-none
                  ${showPostalError ? 'border-red-500 text-red-600' : ''}
                  ${
                    postalCodeTouched && isPostalCodeValid
                      ? 'border-green-500'
                      : 'border-logoblue-30'
                  }
                `}
                required
              />
              {showPostalError && (
                <p className="mt-1 text-sm text-red-600">
                  Please enter a valid postal code (e.g., A1A 1A1)
                </p>
              )}
            </div>
          </div>

          <div className="mb-4 ">
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
      )}
    </div>
  )
}
