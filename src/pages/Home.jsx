import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  HERO_IMAGES,
  STATS,
  WHY_CHOOSE_ITEMS,
  GURUGRAM_SECTORS,
  FEATURED_PROPERTIES,
  AFFORDABLE_PROPERTIES
} from '../utils/constants'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const SLIDE_INTERVAL = 4000
const FADE_OUT_MS = 700
const FADE_IN_DELAY_MS = 500

const Home = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fadeClass, setFadeClass] = useState('opacity-100')
  const intervalRef = useRef(null)
  const timeoutsRef = useRef([])
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Intersection refs
  const [aboutRef, aboutVisible] = useIntersectionObserver({ once: true })
  const [featuredRef, featuredVisible] = useIntersectionObserver({ once: true })
  const [affordableRef, affordableVisible] = useIntersectionObserver({ once: true })
  const [statsRef, statsVisible] = useIntersectionObserver({ once: true })
  const [mapRef, mapVisible] = useIntersectionObserver({ once: true })

  const currentHero = HERO_IMAGES[currentIndex]

  // Preload next image
  useEffect(() => {
    const next = (currentIndex + 1) % HERO_IMAGES.length
    const img = new Image()
    img.src = HERO_IMAGES[next].image
  }, [currentIndex])

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    timeoutsRef.current.forEach((id) => clearTimeout(id))
    timeoutsRef.current = []
  }, [])

  const runCycle = useCallback(() => {
    setFadeClass('opacity-0')
    setIsTransitioning(true)
    const t1 = setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % HERO_IMAGES.length)
      const t2 = setTimeout(() => {
        setFadeClass('opacity-100')
        setIsTransitioning(false)
      }, FADE_IN_DELAY_MS)
      timeoutsRef.current.push(t2)
    }, FADE_OUT_MS)
    timeoutsRef.current.push(t1)
  }, [])

  const startCarousel = useCallback(() => {
    if (prefersReducedMotion.current) return
    clearTimers()
    intervalRef.current = setInterval(runCycle, SLIDE_INTERVAL)
  }, [clearTimers, runCycle])

  // Carousel
  useEffect(() => {
    startCarousel()
    return () => clearTimers()
  }, [startCarousel, clearTimers])

  // Pause carousel when tab is hidden
  useEffect(() => {
    if (prefersReducedMotion.current) return
    const onVisibility = () => {
      if (document.hidden) {
        clearTimers()
      } else {
        startCarousel()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [startCarousel, clearTimers])

  const renderPropertyCard = useCallback((property, variant) => {
    const gradient =
      variant === 'featured'
        ? 'from-indigo-600 to-slate-700'
        : 'from-amber-500 to-orange-500'
    const hoverGradient =
      variant === 'featured'
        ? 'hover:from-indigo-700 hover:to-slate-800'
        : 'hover:from-amber-600 hover:to-orange-600'

    return (
      <article
        key={property.id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-slate-100"
        aria-labelledby={`prop-${property.id}-title`}
      >
        <div className="relative h-64 md:h-72 overflow-hidden">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            width="600"
            height="400"
          />
          {property.status === 'new' && (
            <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
              New Launch
            </span>
          )}
            {property.status === 'upcoming' && (
            <span className="absolute top-4 right-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-lg">
              Coming Soon
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-5 md:p-6 lg:p-8">
          <h3
            id={`prop-${property.id}-title`}
            className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3"
          >
            {property.name}
          </h3>
          <p className="text-slate-600 mb-3 md:mb-4 flex items-center text-sm md:text-base">
            <svg
              className={`w-4 h-4 md:w-5 md:h-5 mr-2 ${
                variant === 'featured' ? 'text-indigo-600' : 'text-amber-600'
              } flex-shrink-0`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {property.location}
          </p>
          <div className="space-y-1 md:space-y-2 mb-4 md:mb-6">
            <p className="text-slate-700 font-medium text-sm md:text-base">
              {property.type}
            </p>
            <p className="text-slate-600 text-sm md:text-base">{property.area}</p>
          </div>
          <p
            className={`text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${
              variant === 'featured'
                ? 'from-indigo-600 to-slate-700'
                : 'from-amber-600 to-orange-600'
            } bg-clip-text text-transparent mb-4 md:mb-6`}
          >
            {property.price}
          </p>
          <Link
            to="/properties"
            className={`inline-block w-full text-center px-4 py-2.5 md:px-6 md:py-3 ${
              variant === 'featured'
                ? 'bg-slate-900 hover:bg-slate-800'
                : `bg-gradient-to-r ${gradient} ${hoverGradient}`
            } text-white font-semibold rounded-lg transition-all hover:scale-105 text-sm md:text-base`}
          >
            View Details
          </Link>
        </div>
      </article>
    )
  }, [])

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        aria-label="Featured projects carousel"
      >
        <div
          className={`absolute inset-0 bg-black z-[5] transition-opacity duration-1000 ${
            prefersReducedMotion.current
              ? 'opacity-0'
              : isTransitioning
              ? 'opacity-100'
              : 'opacity-0'
          }`}
          aria-hidden="true"
        />
        <div className="absolute inset-0" aria-live="polite">
          {HERO_IMAGES.map((hero, idx) => (
            <div
              key={hero.image}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
                idx === currentIndex ? fadeClass : 'opacity-0 pointer-events-none'
              }`}
              style={{ backgroundImage: `url(${hero.image})` }}
              aria-hidden={idx !== currentIndex}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-800/40 to-transparent" />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
        <h1 className="absolute inset-0 z-10 flex items-center justify-center text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white/90 leading-none tracking-tight">
          Signature Globals
        </h1>
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="text-white">
              <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
                {currentHero.description}
              </p>
            </div>
            <div className="text-white lg:text-right">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                {currentHero.title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl">{currentHero.subtitle}</p>
              <p className="text-xl md:text-2xl lg:text-3xl font-semibold mt-2">
                {currentHero.price}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section
        ref={aboutRef}
        aria-labelledby="about-heading"
        className={`py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50 transition-opacity duration-700 ${
          aboutVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-br from-amber-400/20 via-indigo-500/20 to-slate-600/20 rounded-3xl blur-2xl opacity-60" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80"
                alt="Modern living space"
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-5xl md:text-6xl font-bold text-white mb-2">63k+</p>
                <p className="text-lg md:text-xl text-white/90 font-medium">
                  Satisfied Clients
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div>
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                About Signature Globals
              </span>
              <h2
                id="about-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 md:mb-6 leading-tight"
              >
                Crafting Exceptional Living Spaces
              </h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-4">
                Every dream deserves a home. We match your vision with exceptional
                properties.
              </p>
            </div>
            <ul className="space-y-4" aria-label="Company highlights">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-slate-700 rounded-xl flex items-center justify-center">
                  <CheckIcon />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900 mb-1">Established 2014</p>
                  <p className="text-slate-600">
                    Over a decade of excellence in development
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <LocationIcon />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900 mb-1">Strategic Locations</p>
                  <p className="text-slate-600">
                    Prime sectors in Gurugram with strong connectivity
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-600 to-slate-700 rounded-xl flex items-center justify-center">
                  <TimeIcon />
                </div>
                <div>
                  <p className="text-xl font-bold text-slate-900 mb-1">Timely Delivery</p>
                  <p className="text-slate-600">Quality and on-time completion</p>
                </div>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-slate-800 transition-all hover:scale-105 shadow-lg text-lg"
              >
                <span>Learn More About Us</span>
                <ArrowIcon className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section
        ref={featuredRef}
        aria-labelledby="featured-heading"
        className={`py-16 md:py-24 lg:py-32 bg-white transition-opacity duration-700 ${
          featuredVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16">
            <div className="mb-6 md:mb-0">
              <h2
                id="featured-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 md:mb-4"
              >
                Featured Properties
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
                Premium residential projects for modern living
              </p>
            </div>
            <Link
              to="/properties"
              className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-slate-800 transition-all hover:scale-105 shadow-lg text-base md:text-lg self-start md:self-auto"
            >
              <span>View All</span>
              <ArrowIcon className="ml-2" />
            </Link>
          </header>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            role="list"
            aria-label="Featured property list"
          >
            {FEATURED_PROPERTIES.map((p) => renderPropertyCard(p, 'featured'))}
          </div>
        </div>
      </section>

      {/* Affordable */}
      <section
        ref={affordableRef}
        aria-labelledby="affordable-heading"
        className={`py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-slate-100 transition-opacity duration-700 ${
          affordableVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-16">
            <div className="mb-6 md:mb-0">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-3 md:mb-4">
                Affordable Housing
              </span>
              <h2
                id="affordable-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 md:mb-4"
              >
                Affordable Properties
              </h2>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl">
                Quality homes at accessible pricing
              </p>
            </div>
            <Link
              to="/properties"
              className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all hover:scale-105 shadow-lg text-base md:text-lg self-start md:self-auto"
            >
              <span>View All</span>
              <ArrowIcon className="ml-2" />
            </Link>
          </header>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            role="list"
            aria-label="Affordable property list"
          >
            {AFFORDABLE_PROPERTIES.map((p) => renderPropertyCard(p, 'affordable'))}
          </div>
        </div>
      </section>

      {/* Why Choose / Commitment */}
      <section className="py-16 md:py-24 lg:py-32 bg-white" aria-label="Company values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 md:mb-8">
              Why Choose Signature Globals?
            </h2>
            <ul className="space-y-3 md:space-y-4 text-slate-700" aria-label="Reasons list">
              {WHY_CHOOSE_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-100 to-slate-100 rounded-xl flex items-center justify-center mr-3 md:mr-4 mt-1">
                    <CheckSimple />
                  </span>
                  <span className="text-base md:text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 md:mb-8">
              Our Commitment
            </h2>
            <div className="space-y-4 md:space-y-6">
              <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed">
                We deliver excellence with a focus on quality, sustainability, and
                customer satisfaction across every project.
              </p>
              <p className="text-base md:text-lg lg:text-xl text-slate-700 leading-relaxed">
                Buying a home is important. We ensure transparency, timely delivery,
                and support throughout your journey.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center mt-4 md:mt-6 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-slate-700 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-slate-800 transition-all hover:scale-105 shadow-lg text-base md:text-lg"
              >
                <span>Learn More About Us</span>
                <ArrowIcon className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsRef}
        aria-labelledby="stats-heading"
        className={`py-16 md:py-24 lg:py-32 text-white transition-opacity duration-700 ${
          statsVisible ? 'opacity-100' : 'opacity-0'
        } bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="stats-heading" className="sr-only">
            Company statistics
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12" aria-label="Stats list">
            {STATS.map((s, i) => (
              <li
                key={s.label}
                className="flex flex-col items-center"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 md:mb-3">
                  {s.value}
                </p>
                <p className="text-sm md:text-base lg:text-lg font-medium">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sector Map */}
      <section
        ref={mapRef}
        aria-labelledby="map-heading"
        className={`py-16 md:py-24 lg:py-32 bg-slate-50 transition-opacity duration-700 ${
          mapVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2
              id="map-heading"
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-3 md:mb-4"
            >
              Gurugram Sector Map
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto">
              Explore strategic project locations across prime sectors
            </p>
          </header>
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 md:mb-10">
            <img
              src="https://www.abcbuildcon.in/app/webroot/img/upload/maps/main/f38207af910e788cdb44a71aaa4a19df.jpg"
              alt="Gurugram sector distribution map"
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
              width="1200"
              height="800"
            />
          </div>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-4 md:mb-6 text-center">
            Active sectors include:
          </p>
          <ul
            className="flex flex-wrap justify-center gap-3 md:gap-4"
            aria-label="Gurugram sectors list"
          >
            {GURUGRAM_SECTORS.map((sector) => (
              <li key={sector}>
                <span className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-indigo-100 to-slate-100 text-indigo-700 rounded-full font-semibold text-sm md:text-base lg:text-lg">
                  {sector}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
})

Home.displayName = 'Home'

function ArrowIcon({ className = '' }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function LocationIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function TimeIcon() {
  return (
    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}
function CheckSimple() {
  return (
    <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default Home