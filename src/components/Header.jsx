import { memo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { NAV_LINKS } from '../utils/constants'
import { throttle } from '../utils/throttle'

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Use ref to store throttled function to prevent recreation
  const throttledScrollRef = useRef(
    throttle(() => {
      setIsScrolled(window.scrollY > 50)
    }, 100)
  )

  const handleScroll = useCallback(() => {
    throttledScrollRef.current()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const isActive = useCallback((path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }, [location.pathname])

  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage
          ? 'bg-white shadow-md' 
          : 'bg-transparent'
      }`}
    >
      {/* Main Nav Area */}
      <div className={`${isScrolled || !isHomePage ? 'bg-white' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'bg-teal-600 shadow-lg' 
                  : 'bg-white/20 backdrop-blur-sm'
              } group-hover:scale-110`}>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <span className={`text-xl md:text-2xl font-bold block transition-colors ${
                  isScrolled || !isHomePage ? 'text-gray-900' : 'text-white'
                }`}>
                  Signature Globals
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      active
                        ? isScrolled || !isHomePage
                          ? 'text-teal-600'
                          : 'text-white'
                        : isScrolled || !isHomePage
                          ? 'text-gray-700 hover:text-teal-600'
                          : 'text-white/90 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled || !isHomePage ? 'bg-teal-600' : 'bg-white'
                      }`}></span>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Contact Us Button */}
            <div className="hidden md:flex items-center">
              <Link
                to="/contact"
                className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  isScrolled || !isHomePage
                    ? 'bg-teal-600 text-white shadow-lg hover:bg-teal-700 hover:shadow-xl hover:scale-105'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                }`}
              >
                <span>Contact us</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled || !isHomePage ? 'text-gray-700 hover:text-teal-600' : 'text-white hover:text-white/80'
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 text-base font-medium rounded-lg transition-all ${
                      active 
                        ? 'text-teal-600 bg-teal-50' 
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                to="/contact"
                className="mx-4 px-6 py-2.5 bg-teal-600 text-white rounded-full text-sm font-semibold text-center hover:bg-teal-700 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact us
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'

export default Header
