import { memo, useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { HERO_IMAGES, STATS, WHY_CHOOSE_ITEMS, GURUGRAM_SECTORS } from '../utils/constants'

const Home = memo(() => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fadeClass, setFadeClass] = useState('opacity-100')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [aboutRef, aboutVisible] = useIntersectionObserver({ once: true })
  const [propertiesRef, propertiesVisible] = useIntersectionObserver({ once: true })
  const [statsRef, statsVisible] = useIntersectionObserver({ once: true })
  const [mapRef, mapVisible] = useIntersectionObserver({ once: true })

  const currentHero = useMemo(() => HERO_IMAGES[currentImageIndex], [currentImageIndex])

  // Preload next hero image for smoother transitions
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % HERO_IMAGES.length
    const nextImage = new Image()
    nextImage.src = HERO_IMAGES[nextIndex].image
  }, [currentImageIndex])

  // Image carousel effect with black fade - optimized with cleanup
  useEffect(() => {
    let timeoutId1, timeoutId2
    const interval = setInterval(() => {
      // Fade out current image
      setFadeClass('opacity-0')
      setIsTransitioning(true)
      
      // After fade out completes, change image and fade in
      timeoutId1 = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
        // Small delay before fading in new image
        timeoutId2 = setTimeout(() => {
          setFadeClass('opacity-100')
          setIsTransitioning(false)
        }, 500)
      }, 700) // Wait for fade out to complete
    }, 4000) // Change image every 4 seconds

    return () => {
      clearInterval(interval)
      if (timeoutId1) clearTimeout(timeoutId1)
      if (timeoutId2) clearTimeout(timeoutId2)
    }
  }, [])

  return (
    <div>
      {/* Hero Section with Image Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Black overlay during transition */}
        <div 
          className={`absolute inset-0 bg-black z-[5] transition-opacity duration-1000 ${
            isTransitioning ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Background Images with Fade */}
        {HERO_IMAGES.map((hero, index) => (
          <div
            key={`hero-${index}`}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? fadeClass : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${hero.image})`
            }}
            aria-hidden={index !== currentImageIndex}
          >
            {/* Gradient Overlay - Darker on left for text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-transparent" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}

        {/* Centered Title */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white/90 leading-none tracking-tight animate-fade-in">
            Signature Globals
          </h1>
        </div>

        {/* Bottom Text Blocks - Dynamic content based on current image */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Bottom Left Text */}
            <div className="text-white animate-fade-in">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
                {currentHero.description}
              </p>
            </div>

            {/* Bottom Right Text */}
            <div className="text-white lg:text-right animate-slide-in-right">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{currentHero.title}</h2>
              <p className="text-base md:text-lg lg:text-xl">{currentHero.subtitle}</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">{currentHero.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section 
        ref={aboutRef}
        className={`py-16 md:py-20 bg-white transition-all duration-1000 ${aboutVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12">About Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80" 
                alt="Modern living room" 
                className="rounded-lg shadow-xl w-full h-auto"
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            <div className="animate-fade-in-up">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Every dream deserves a home. At Signature Globals, we match your vision with exceptional properties, making your ideal living space a reality. With over 63,000 satisfied clients since our inception, we've been transforming the real estate landscape in Gurugram.
              </p>
              <div className="text-6xl font-bold text-teal-600 mb-2">63k+</div>
              <p className="text-xl text-gray-600 mb-8">satisfied clients since inception</p>
              <Link 
                to="/about"
                className="inline-block px-8 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section 
        ref={propertiesRef}
        className={`py-16 md:py-20 bg-gray-50 transition-all duration-1000 ${propertiesVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600">Discover our premium residential projects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Property 1 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" 
                  alt="Cloverdale SPR" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New Launch
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Cloverdale SPR</h3>
                <p className="text-gray-600 mb-4">Sector 71, Gurugram</p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700">3, 3.5 & 4.5 BHK Luxury Apartments</p>
                  <p className="text-gray-700">2,200 to 3,200 sq. ft.</p>
                </div>
                <p className="text-2xl font-bold text-teal-600 mb-4">Starting from ₹3.88 Cr*</p>
                <Link 
                  to="/properties"
                  className="inline-block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" 
                  alt="Titanium SPR" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Titanium SPR</h3>
                <p className="text-gray-600 mb-4">Sector 71, Gurugram</p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700">3, 3.5 & 4.5 BHK Luxury Apartments</p>
                  <p className="text-gray-700">2,200 to 3,750 sq. ft.</p>
                </div>
                <p className="text-2xl font-bold text-teal-600 mb-4">Starting from ₹3.88 Cr*</p>
                <Link 
                  to="/properties"
                  className="inline-block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img 
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" 
                  alt="Daxin Vistas" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Daxin Vistas</h3>
                <p className="text-gray-600 mb-4">Sohna, South of Gurugram</p>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-700">3 BHK + Study Apartments</p>
                  <p className="text-gray-700">Premium Location</p>
                </div>
                <p className="text-2xl font-bold text-teal-600 mb-4">Starting from ₹1.99 Cr*</p>
                <Link 
                  to="/properties"
                  className="inline-block w-full text-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Signature Globals?</h2>
              <ul className="space-y-3 text-gray-700">
                {WHY_CHOOSE_ITEMS.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-teal-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Signature Globals, we are committed to delivering excellence in every project. Our focus on quality, sustainability, and customer satisfaction has made us one of the most trusted real estate developers in Gurugram.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We understand that buying a home is one of life's most important decisions. That's why we ensure transparency, timely delivery, and exceptional after-sales service to make your journey smooth and rewarding.
              </p>
              <Link
                to="/about"
                className="inline-block mt-4 px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className={`py-16 md:py-20 bg-teal-600 text-white transition-all duration-1000 ${statsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
              <div key={stat.label} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gurgaon Sector Map Section */}
      <section 
        ref={mapRef}
        className={`py-16 md:py-20 bg-white transition-all duration-1000 ${mapVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gurugram Sector Map</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our strategic locations across Gurugram's prime sectors
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://www.abcbuildcon.in/app/webroot/img/upload/maps/main/f38207af910e788cdb44a71aaa4a19df.jpg"
              alt="Gurugram Sector Map"
              className="w-full h-auto"
              loading="lazy"
              width="1200"
              height="800"
            />
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Our projects are strategically located in prime sectors of Gurugram including:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {GURUGRAM_SECTORS.map((sector) => (
                <span key={sector} className="px-4 py-2 bg-teal-100 text-teal-700 rounded-full font-medium">
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
})

Home.displayName = 'Home'

export default Home
