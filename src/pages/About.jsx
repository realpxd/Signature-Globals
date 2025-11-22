import { memo } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { COMPANY_INFO } from '../utils/constants'

const About = memo(() => {
  const [heroRef, heroVisible] = useIntersectionObserver({ once: true })
  const [valuesRef, valuesVisible] = useIntersectionObserver({ once: true })
  const [storyRef, storyVisible] = useIntersectionObserver({ once: true })
  const [officeRef, officeVisible] = useIntersectionObserver({ once: true })
  const [teamRef, teamVisible] = useIntersectionObserver({ once: true })

  return (
    <div>
      {/* Hero Section with Large Background Image */}
      <section 
        ref={heroRef}
        className={`relative h-[85vh] md:h-[90vh] flex items-end overflow-hidden transition-all duration-1000 ${
          heroVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)'
          }}
        >
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
        </div>

        {/* Text Overlay - Bottom Left and Right */}
        <div className="relative z-10 w-full pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              {/* Left Side - Main Title */}
              <div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-none tracking-tight mb-6">
                  About Us
                </h1>
              </div>
              
              {/* Right Side - Description */}
              <div className="flex items-end">
                <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-2xl">
                  Whether designing homes, commercial spaces, or urban landscapes, we focus on crafting environments that enrich lives and stand the test of time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Column Section - Vision, Mission, Core Value */}
      <section 
        ref={valuesRef}
        className={`py-20 md:py-28 bg-gray-900 text-white transition-all duration-1000 ${
          valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {/* Our Vision */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                To redefine modern architecture by creating inspiring, sustainable, and functional spaces that shape the future.
              </p>
            </div>

            {/* Our Mission */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                To deliver innovative, client-focused architectural solutions that blend aesthetics, efficiency, and environmental responsibility.
              </p>
            </div>

            {/* Core Value */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Value</h2>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                To uphold innovation, sustainability, excellence, and collaboration in every project, ensuring timeless design and meaningful impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section 
        ref={storyRef}
        className={`py-20 md:py-28 bg-white transition-all duration-1000 ${
          storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 md:mb-8">Our Story</h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Every dream deserves a home. At Signature Globals, we match your vision with exceptional properties, making your ideal living space a reality. Established in 2014, we have significantly transformed Gurugram's real estate landscape with our commitment to quality, innovative designs, and customer-centric approach.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  With a strong portfolio of residential and commercial projects, Signature Global emphasizes sustainability and timely delivery. Our developments are strategically located, offering excellent connectivity and accessibility, making them highly attractive to both buyers and investors.
                </p>
                <div className="pt-6">
                  <div className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-indigo-600 to-slate-700 bg-clip-text text-transparent mb-3">63k+</div>
                  <p className="text-xl md:text-2xl text-gray-600 font-medium">satisfied clients since inception</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 to-slate-700 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80" 
                  alt="Modern living room" 
                  className="relative rounded-2xl shadow-2xl w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="800"
                  height="600"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: (
                  <svg className="w-14 h-14 md:w-16 md:h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Quality',
                description: 'Uncompromising commitment to excellence in every project'
              },
              {
                icon: (
                  <svg className="w-14 h-14 md:w-16 md:h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Timely Delivery',
                description: 'We honor our commitments and deliver on time'
              },
              {
                icon: (
                  <svg className="w-14 h-14 md:w-16 md:h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Sustainability',
                description: 'Environmentally responsible development practices'
              }
            ].map((value, index) => (
              <div 
                key={value.title} 
                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Offices Section */}
      <section 
        ref={officeRef}
        className={`py-20 md:py-28 bg-white transition-all duration-1000 ${
          officeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Our Offices</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
              With our corporate office in Gurugram, Signature Globals is strategically positioned to serve the real estate needs of the region.
            </p>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" 
              alt="Office" 
              className="w-full h-[500px] md:h-[600px] object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
              width="1200"
              height="600"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Gurugram, Haryana</h3>
                <div className="space-y-4 text-white">
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-lg">{COMPANY_INFO.email}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-lg">{COMPANY_INFO.phone.primary}</span>
                  </div>
                  <div className="flex items-start space-x-4">
                    <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-lg leading-relaxed">{COMPANY_INFO.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Agents Section */}
      <section 
        ref={teamRef}
        className={`py-20 md:py-28 bg-gray-50 transition-all duration-1000 ${
          teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Meet Our Agents</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
              The Signature Globals team is a diverse group of professionals dedicated to making your real estate dreams a reality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { name: 'Priya Sharma', role: 'Senior Sales Executive', experience: '10+ years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
              { name: 'Rajesh Kumar', role: 'Property Consultant', experience: '8+ years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
              { name: 'Anjali Mehta', role: 'Business Development Manager', experience: '12+ years', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }
            ].map((member) => (
              <div 
                key={member.name} 
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold text-base md:text-lg mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.experience} experience</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
})

About.displayName = 'About'

export default About
