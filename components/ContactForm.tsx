export default function ContactForm() {
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
            placeholder="What's Your Name?"
            className="w-full max-w-[600px] p-2 border rounded-lg"
          />
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
              placeholder="Enter an Email"
              className="w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-lg"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="phone" className="block text-lg mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full sm:max-w-[650px] lg:max-w-[700px] p-2 border rounded-lg"
              placeholder="Enter number"
              pattern="[\+]?[0-9]{1,4}[-\s]?[0-9]+[-\s]?[0-9]+[-\s]?[0-9]+"
            />
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
            className="w-full max-w-[700px] h-40 sm:h-48 p-2 border rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-logoblue-10 text-white p-3 rounded-lg hover:bg-logoblue-9"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
