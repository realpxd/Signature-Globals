import { memo } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// Move team data outside component
const TEAM_MEMBERS = [
  {
    name: 'Priya Sharma',
    role: 'Senior Sales Executive',
    experience: '10+ years',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    description: 'Expert in residential property sales with a proven track record of client satisfaction.'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Property Consultant',
    experience: '8+ years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    description: 'Specialized in luxury properties and investment opportunities in Gurugram.'
  },
  {
    name: 'Anjali Mehta',
    role: 'Business Development Manager',
    experience: '12+ years',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    description: 'Leading business development initiatives and strategic partnerships.'
  },
  {
    name: 'Vikram Singh',
    role: 'Commercial Property Specialist',
    experience: '9+ years',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    description: 'Expert in commercial real estate and office space solutions.'
  },
  {
    name: 'Neha Gupta',
    role: 'Customer Relations Manager',
    experience: '7+ years',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    description: 'Ensuring exceptional customer experience throughout the property journey.'
  },
  {
    name: 'Amit Patel',
    role: 'Legal Advisor',
    experience: '15+ years',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    description: 'Providing expert legal guidance for all property transactions.'
  }
]

const Team = memo(() => {
  const [heroRef, heroVisible] = useIntersectionObserver({ once: true })
  const [introRef, introVisible] = useIntersectionObserver({ once: true })
  const [teamRef, teamVisible] = useIntersectionObserver({ once: true })
  const [ctaRef, ctaVisible] = useIntersectionObserver({ once: true })

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`relative py-24 md:py-32 bg-gradient-to-br from-teal-600 to-teal-800 text-white transition-all duration-1000 ${
          heroVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">Meet Our Team</h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl">
            A diverse group of professionals dedicated to making your real estate dreams a reality
          </p>
        </div>
      </section>

      {/* Team Introduction */}
      <section 
        ref={introRef}
        className={`py-10 md:py-12 bg-white transition-all duration-1000 ${
          introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-base md:text-lg text-gray-700 text-center max-w-3xl mx-auto">
            The Signature Globals team is a diverse group of professionals dedicated to making your real estate dreams a reality. Each member brings a unique perspective and a shared passion for client satisfaction.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section 
        ref={teamRef}
        className={`py-16 md:py-20 bg-gray-50 transition-all duration-1000 ${
          teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.name}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="400"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-teal-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-3 md:mb-4">{member.experience} experience</p>
                  <p className="text-sm md:text-base text-gray-700">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section 
        ref={ctaRef}
        className={`py-16 md:py-20 bg-white transition-all duration-1000 ${
          ctaVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Join Our Team</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            We're always looking for talented individuals who share our passion for real estate excellence
          </p>
          <a
            href="mailto:info@projectssignatureglobal.in?subject=Career Opportunity"
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-all hover:scale-105"
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  )
})

Team.displayName = 'Team'

export default Team
