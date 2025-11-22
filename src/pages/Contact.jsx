import { memo, useState, useCallback, useRef } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { COMPANY_INFO } from '../utils/constants'

const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [heroRef, heroVisible] = useIntersectionObserver({ once: true })
  const [formRef, formVisible] = useIntersectionObserver({ once: true })
  const [infoRef, infoVisible] = useIntersectionObserver({ once: true })
  const formRefElement = useRef(null)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    // In production, this would send to an API
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    // Reset form validation
    if (formRefElement.current) {
      formRefElement.current.reset()
    }
  }, [formData])

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden transition-all duration-1000 ${
          heroVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
        </div>
        <div className="relative z-10 w-full pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl">Get in touch with our team for any inquiries</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className={`transition-all duration-1000 ${
                formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              <form ref={formRefElement} onSubmit={handleSubmit} className="space-y-6 md:space-y-7">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all"
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600 focus:border-teal-600 transition-all resize-none"
                    placeholder="Tell us more about your inquiry"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-slate-800 transition-all hover:scale-105 shadow-lg text-base md:text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div 
              ref={infoRef}
              className={`transition-all duration-1000 ${
                infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Get in Touch</h2>
              <div className="space-y-8 md:space-y-10">
                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Address</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {COMPANY_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Phone</h3>
                    <a href={`tel:${COMPANY_INFO.phone.primary.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-700 transition-colors block mb-2 text-base md:text-lg">
                      {COMPANY_INFO.phone.primary}
                    </a>
                    <a href={`tel:${COMPANY_INFO.phone.secondary.replace(/\s/g, '')}`} className="text-indigo-600 hover:text-indigo-700 transition-colors block text-base md:text-lg">
                      {COMPANY_INFO.phone.secondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Email</h3>
                    <a href={`mailto:${COMPANY_INFO.email}`} className="text-indigo-600 hover:text-indigo-700 transition-colors break-all text-base md:text-lg">
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-5">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600 transition-colors">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-indigo-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Business Hours</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.22348999274!2d77.0815!3d28.4089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d227e8c5c5b5b%3A0x1234567890abcdef!2sSouth%20City-1%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Signature Globals Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

Contact.displayName = 'Contact'

export default Contact
