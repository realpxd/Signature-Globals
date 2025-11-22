import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// Move services data outside component
const SERVICES_DATA = [
  {
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Property Sales',
    description: 'Comprehensive property sales services with expert guidance through every step of your real estate journey.'
  },
  {
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Property Consultation',
    description: 'Expert consultation services to help you make informed decisions about your property investments.'
  },
  {
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Legal Assistance',
    description: 'Complete legal support for property documentation, registration, and compliance requirements.'
  },
  {
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Home Loan Assistance',
    description: 'Expert guidance and support for securing the best home loan options tailored to your needs.'
  },
  {
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Property Management',
    description: 'Comprehensive property management services for residential and commercial properties.'
  },
  {
    icon: (
      <svg className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Sustainable Development',
    description: 'EDGE and IGBC certified projects with environmentally friendly building concepts and green initiatives.'
  }
]

const STATS_DATA = [
  { value: '10+', label: 'Years of Experience' },
  { value: '63k+', label: 'Happy Clients' },
  { value: '50+', label: 'Completed Projects' },
  { value: '100%', label: 'Customer Satisfaction' }
]

const Services = memo(() => {
  const [heroRef, heroVisible] = useIntersectionObserver({ once: true })
  const [servicesRef, servicesVisible] = useIntersectionObserver({ once: true })
  const [statsRef, statsVisible] = useIntersectionObserver({ once: true })
  const [ctaRef, ctaVisible] = useIntersectionObserver({ once: true })

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
            backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
        </div>
        <div className="relative z-10 w-full pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4">Our Services</h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl">Comprehensive real estate solutions tailored to your needs</p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section 
        ref={servicesRef}
        className={`py-20 md:py-28 bg-white transition-all duration-1000 ${
          servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {SERVICES_DATA.map((service, index) => (
              <div 
                key={service.title}
                className="bg-gray-50 p-8 md:p-10 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-indigo-600 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        ref={statsRef}
        className={`py-20 md:py-28 bg-gray-50 transition-all duration-1000 ${
          statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Why Choose Signature Globals?</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional service and value to our clients
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS_DATA.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-slate-700 bg-clip-text text-transparent mb-3">{stat.value}</div>
                <div className="text-lg md:text-xl text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className={`py-16 md:py-24 lg:py-28 text-white transition-all duration-1000 animate-gradient-bg ${
          ctaVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-10">Contact us today to learn more about our services</p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-base md:text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
})

Services.displayName = 'Services'

export default Services
