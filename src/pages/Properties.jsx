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
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-teal-600 to-teal-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">Properties</h1>
          <p className="text-lg md:text-xl lg:text-2xl max-w-2xl">Discover our premium residential and commercial projects</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4">
            {[
              { value: 'all', label: 'All Properties' },
              { value: 'residential', label: 'Residential' },
              { value: 'commercial', label: 'Commercial' }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  filter === filterOption.value
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        className={`py-16 md:py-20 bg-gray-50 transition-all duration-1000 ${
          propertiesVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProperties.map((property) => (
              <div 
                key={property.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  {property.status === 'new' && (
                    <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      New Launch
                    </div>
                  )}
                  {property.status === 'upcoming' && (
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Coming Soon
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.name}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <LocationIcon className="w-5 h-5 mr-2 text-teal-600" />
                    {property.location}
                  </p>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-700 font-medium">{property.type}</p>
                    <p className="text-gray-600">{property.bedrooms}</p>
                    <p className="text-gray-600">{property.area}</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-teal-600 mb-4">{property.price}</p>
                  <Link 
                    to="/contact"
                    className="inline-block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:scale-105"
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
      <section className="py-16 md:py-20 bg-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl mb-8">Our team is here to help you find your perfect property</p>
          <Link 
            to="/contact"
            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-white text-teal-600 font-semibold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
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
