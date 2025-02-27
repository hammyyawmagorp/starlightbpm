import { useState } from 'react'

export default function ContactForm() {
  const [name, setName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)

  const [email, setEmail] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)

  const [phone, setPhone] = useState('')
  const [phoneTouched, setPhoneTouched] = useState(false)

  // Validation Checks
  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  const isPhoneValid = phone.replace(/\D/g, '').length >= 10 // Removes non-numeric characters and checks length
  const isNameValid = name.match(/^[a-zA-Z\s]+$/) && name.length >= 2 // Must be at least 2 characters and contain only letters/spaces

  return (
    <div className="w-full lg:w-1/2 p-6">
      <h1 className="font-bold text-logoblue-10 text-4xl mb-4">Contact Us</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            className={`w-full max-w-[600px] p-2 border rounded-lg hover:bg-logobrown-20 focus:outline-none 
              ${
                nameTouched && !isNameValid ? 'border-red-500 text-red-600' : ''
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
            <label htmlFor="email" className="block text-lg mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-lg hover:bg-logobrown-20 focus:outline-none
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
            <label htmlFor="phone" className="block text-lg mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone #..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onBlur={() => setPhoneTouched(true)}
              className={`w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-lg hover:bg-logobrown-20 focus:outline-none
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
          <label htmlFor="message" className="block text-lg mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Please provide some details about the work..."
            className="w-full max-w-[700px] h-40 sm:h-48 p-2 border border-logoblue-30 rounded-lg hover:bg-logobrown-20"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-logoblue-10 text-white p-3 rounded-lg relative overflow-hidden group hover:bg-logoblue-30 hover:scale-105"
        >
          <span className="relative z-10 transition-opacity duration-300 group-hover:opacity-0">
            Submit
          </span>
          <div
            className="absolute left-[-100%] top-0 h-full w-full bg-no-repeat bg-center bg-contain transition-all duration-300 ease-in-out group-hover:translate-x-full"
            style={{ backgroundImage: "url('/submit-btn-img.svg')" }}
          ></div>
        </button>
      </form>
    </div>
  )
}
