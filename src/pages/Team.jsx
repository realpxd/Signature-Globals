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
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4">Meet Our Team</h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl">
              A diverse group of professionals dedicated to making your real estate dreams a reality
            </p>
          </div>
        </div>
      </section>

      {/* Team Introduction */}
      <section 
        ref={introRef}
        className={`py-12 md:py-16 bg-white transition-all duration-1000 ${
          introVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl md:text-2xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            The Signature Globals team is a diverse group of professionals dedicated to making your real estate dreams a reality. Each member brings a unique perspective and a shared passion for client satisfaction.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section 
        ref={teamRef}
        className={`py-20 md:py-28 bg-gray-50 transition-all duration-1000 ${
          teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.name}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
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
                  <p className="text-gray-600 mb-4">{member.experience} experience</p>
                  <p className="text-gray-700 leading-relaxed">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section 
        ref={ctaRef}
        className={`py-20 md:py-28 bg-white transition-all duration-1000 ${
          ctaVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Join Our Team</h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-10">
            We're always looking for talented individuals who share our passion for real estate excellence
          </p>
          <a
            href="mailto:info@projectssignatureglobal.in?subject=Career Opportunity"
            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-slate-800 transition-all hover:scale-105 shadow-lg text-base md:text-lg"
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
