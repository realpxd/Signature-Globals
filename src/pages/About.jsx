import { memo } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { COMPANY_INFO } from '../utils/constants'

// Move values outside component to prevent recreation on each render
const ABOUT_VALUES = [
  {
    icon: (
      <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Quality',
    description: 'Uncompromising commitment to excellence in every project'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Timely Delivery',
    description: 'We honor our commitments and deliver on time'
  },
  {
    icon: (
      <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Sustainability',
    description: 'Environmentally responsible development practices'
  }
]

const About = memo(() => {
  const [storyRef, storyVisible] = useIntersectionObserver({ once: true })
  const [missionRef, missionVisible] = useIntersectionObserver({ once: true })
  const [valuesRef, valuesVisible] = useIntersectionObserver({ once: true })
  const [officeRef, officeVisible] = useIntersectionObserver({ once: true })
  const [teamRef, teamVisible] = useIntersectionObserver({ once: true })

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">About us</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={storyRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-20 transition-all duration-1000 ${
              storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80" 
                alt="Modern living room" 
                className="rounded-lg shadow-xl w-full h-auto"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Our Story</h2>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                Every dream deserves a home. At Signature Globals, we match your vision with exceptional properties, making your ideal living space a reality. Established in 2014, we have significantly transformed Gurugram's real estate landscape with our commitment to quality, innovative designs, and customer-centric approach.
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4 md:mb-6">
                With a strong portfolio of residential and commercial projects, Signature Global emphasizes sustainability and timely delivery. Our developments are strategically located, offering excellent connectivity and accessibility, making them highly attractive to both buyers and investors.
              </p>
              <div className="mt-6 md:mt-8">
                <div className="text-5xl md:text-6xl font-bold text-teal-600 mb-2">63k+</div>
                <p className="text-lg md:text-xl text-gray-600">satisfied clients since inception</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div 
            ref={missionRef}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-20 transition-all duration-1000 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Our Mission</h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                To create exceptional living spaces that blend luxury, comfort, and sustainability. We are committed to delivering quality homes that exceed expectations while maintaining the highest standards of construction and design.
              </p>
            </div>
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Our Vision</h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                To be the most trusted and preferred real estate developer in the region, known for innovation, integrity, and excellence. We envision a future where every family finds their perfect home with us.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div 
            ref={valuesRef}
            className={`mb-16 md:mb-20 transition-all duration-1000 ${
              valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {ABOUT_VALUES.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Offices Section */}
          <div 
            ref={officeRef}
            className={`mb-16 md:mb-20 transition-all duration-1000 ${
              officeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Our Offices</h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-3xl">
              With our corporate office in Gurugram, Signature Globals is strategically positioned to serve the real estate needs of the region. Our location is staffed with local experts ready to assist you in your real estate journey.
            </p>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" 
                alt="Office" 
                className="w-full h-96 object-cover"
                loading="lazy"
                width="1200"
                height="400"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/20 max-w-md">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Gurugram, Haryana</h3>
                  <div className="space-y-2 text-white text-sm md:text-base">
                    <p className="flex items-center space-x-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{COMPANY_INFO.email}</span>
                    </p>
                    <p className="flex items-center space-x-2">
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{COMPANY_INFO.phone.primary}</span>
                    </p>
                    <p className="flex items-start space-x-2">
                      <svg className="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{COMPANY_INFO.address}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meet Our Agents Section */}
          <div 
            ref={teamRef}
            className={`transition-all duration-1000 ${
              teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8">
              <div className="mb-4 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Meet Our Agents</h2>
                <p className="text-base md:text-lg text-gray-700 max-w-2xl">
                  The Signature Globals team is a diverse group of professionals dedicated to making your real estate dreams a reality. Each member brings a unique perspective and a shared passion for client satisfaction.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: 'Priya Sharma', role: 'Senior Sales Executive', experience: '10+ years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
                { name: 'Rajesh Kumar', role: 'Property Consultant', experience: '8+ years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
                { name: 'Anjali Mehta', role: 'Business Development Manager', experience: '12+ years', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }
              ].map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-teal-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width="400"
                      height="400"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.experience} experience</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

About.displayName = 'About'

export default About
