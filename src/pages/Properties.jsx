import { memo, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { LocationIcon } from '../components/Icons'

// Move properties data outside component to prevent recreation
const PROPERTIES_DATA = [
  {
    id: 1,
    name: 'Cloverdale SPR',
    location: 'Sector 71, Gurugram',
    type: 'Luxury Apartments',
    bedrooms: '3, 3.5 & 4.5 BHK',
    area: '2,200 to 3,200 sq. ft.',
    price: '₹3.88 Cr*',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    status: 'new',
    category: 'residential'
  },
  {
    id: 2,
    name: 'Titanium SPR',
    location: 'Sector 71, Gurugram',
    type: 'Luxury Apartments',
    bedrooms: '3, 3.5 & 4.5 BHK',
    area: '2,200 to 3,750 sq. ft.',
    price: '₹3.88 Cr*',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    status: 'available',
    category: 'residential'
  },
  {
    id: 3,
    name: 'Daxin Vistas',
    location: 'Sohna, South of Gurugram',
    type: 'Premium Apartments',
    bedrooms: '3 BHK + Study',
    area: 'Premium Location',
    price: '₹1.99 Cr*',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
    status: 'available',
    category: 'residential'
  },
  {
    id: 4,
    name: 'Signature Global Sector 37D',
    location: 'Sector 37D, Gurugram',
    type: 'Housing Project',
    bedrooms: 'Multiple Options',
    area: '8.39 Acres',
    price: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80',
    status: 'upcoming',
    category: 'residential'
  },
  {
    id: 5,
    name: 'Signature Global Sector 71',
    location: 'Sector 71, Gurugram',
    type: 'Premium Housing',
    bedrooms: 'Multiple Options',
    area: '16.12 Acres',
    price: 'Coming Soon',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=600&q=80',
    status: 'upcoming',
    category: 'residential'
  },
  {
    id: 6,
    name: 'Signature Tower',
    location: 'South City-1, Gurugram',
    type: 'Commercial & Residential',
    bedrooms: 'Office Spaces',
    area: 'Premium Location',
    price: 'Contact Us',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    status: 'available',
    category: 'commercial'
  }
]

const Properties = memo(() => {
  const [filter, setFilter] = useState('all')
  const [propertiesRef, propertiesVisible] = useIntersectionObserver({ once: true })

  // Memoize filtered properties to prevent recalculation
  const filteredProperties = useMemo(() => {
    return filter === 'all' 
      ? PROPERTIES_DATA 
      : PROPERTIES_DATA.filter(p => p.category === filter)
  }, [filter])

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
        </div>
        <div className="relative z-10 w-full pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4">Properties</h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl">Discover our premium residential and commercial projects</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 md:py-10 bg-white border-b sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { value: 'all', label: 'All Properties' },
              { value: 'residential', label: 'Residential' },
              { value: 'commercial', label: 'Commercial' }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all ${
                  filter === filterOption.value
                    ? 'bg-gradient-to-r from-indigo-600 to-slate-700 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section 
        ref={propertiesRef}
        className={`py-20 md:py-28 bg-gray-50 transition-all duration-1000 ${
          propertiesVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProperties.map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  {property.status === 'new' && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                      New Launch
                    </div>
                  )}
                  {property.status === 'upcoming' && (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-gradient-to-r from-indigo-600 to-slate-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
                      Coming Soon
                    </div>
                  )}
                </div>
                <div className="p-5 md:p-6 lg:p-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-2 md:mb-3">{property.name}</h3>
                  <p className="text-slate-600 mb-3 md:mb-4 flex items-center text-sm md:text-base lg:text-lg">
                    <LocationIcon className="w-4 h-4 md:w-5 md:h-5 mr-2 text-indigo-600 flex-shrink-0" />
                    {property.location}
                  </p>
                  <div className="space-y-1 md:space-y-2 mb-4 md:mb-6">
                    <p className="text-slate-700 font-medium text-sm md:text-base">{property.type}</p>
                    <p className="text-slate-600 text-sm md:text-base">{property.bedrooms}</p>
                    <p className="text-slate-600 text-sm md:text-base">{property.area}</p>
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-slate-700 bg-clip-text text-transparent mb-4 md:mb-6">{property.price}</p>
                  <Link 
                    to="/contact"
                    className="inline-block w-full text-center px-4 py-2.5 md:px-6 md:py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-all hover:scale-105 text-sm md:text-base"
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-28 text-white animate-gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Can't Find What You're Looking For?</h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10">Our team is here to help you find your perfect property</p>
          <Link 
            to="/contact"
            className="inline-block px-6 py-3 md:px-8 md:py-4 bg-white text-indigo-600 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105 shadow-lg text-base md:text-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
})

Properties.displayName = 'Properties'

export default Properties
