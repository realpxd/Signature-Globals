import { memo, useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../utils/constants'

const SCROLL_THRESHOLD = 80

const Header = memo(() => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollStateRef = useRef(false)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // rAF scroll listener (better than throttle + avoids extra renders)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrolled = window.scrollY > SCROLL_THRESHOLD
        if (lastScrollStateRef.current !== scrolled) {
          lastScrollStateRef.current = scrolled
          setIsScrolled(scrolled)
        }
        ticking = false
      })
    }
    // Initialize once
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    const body = document.body
    if (isMenuOpen) {
      body.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
    }
    return () => {
      body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close on Escape
  useEffect(() => {
    if (!isMenuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMenuOpen])

  const isActive = useCallback(
    (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)),
    [location.pathname]
  )

  const isHomePage = location.pathname === '/'
  const showSolid = isScrolled || !isHomePage
  const transitionClass = prefersReducedMotion.current ? '' : 'transition-all duration-300'

  const desktopLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => {
        const active = isActive(link.path)
        return (
          <Link
            key={link.path}
            to={link.path}
            aria-current={active ? 'page' : undefined}
            className={`relative px-4 py-2 text-sm font-semibold uppercase tracking-wide ${transitionClass} ${
              active
                ? showSolid
                  ? 'text-indigo-600'
                  : 'text-white'
                : showSolid
                  ? 'text-gray-700 hover:text-indigo-600'
                  : 'text-white/90 hover:text-white'
            }`}
          >
            {link.label}
            {active && (
              <span
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-full ${
                  showSolid ? 'bg-indigo-600' : 'bg-white'
                }`}
              />
            )}
          </Link>
        )
      }),
    [isActive, showSolid, transitionClass]
  )

  const mobileLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => {
        const active = isActive(link.path)
        return (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            aria-current={active ? 'page' : undefined}
            className={`px-4 py-2 text-base font-medium rounded-lg ${transitionClass} ${
              active ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}
          >
            {link.label}
          </Link>
        )
      }),
    [isActive, transitionClass]
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${transitionClass} ${
        showSolid ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" aria-label="Go to homepage">
            <div
              className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${transitionClass} ${
                showSolid
                  ? 'bg-gradient-to-br from-indigo-600 to-slate-700 shadow-lg'
                  : 'bg-white/20 backdrop-blur-md'
              } group-hover:scale-110`}
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span
              className={`text-2xl md:text-3xl font-bold block ${transitionClass} ${
                showSolid ? 'text-gray-900' : 'text-white'
              }`}
            >
              Signature Globals
            </span>
          </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-2" aria-label="Primary">
              {desktopLinks}
            </nav>

            {/* Contact */}
            <div className="hidden md:flex items-center">
              <Link
                to="/contact"
                className={`px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wide flex items-center space-x-2 ${transitionClass} ${
                  showSolid
                    ? 'bg-gradient-to-r from-indigo-600 to-slate-700 text-white shadow-lg hover:from-indigo-700 hover:to-slate-800 hover:shadow-xl hover:scale-105'
                    : 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:scale-105'
                }`}
              >
                <span>Contact us</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className={`md:hidden p-2 ${transitionClass} ${
                showSolid ? 'text-gray-700 hover:text-indigo-600' : 'text-white hover:text-white/80'
              }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          id="mobile-menu"
          className={`md:hidden overflow-hidden ${transitionClass} ${
            isMenuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col space-y-2" aria-label="Mobile">
            {mobileLinks}
            <Link
              to="/contact"
              className="mx-4 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-slate-700 text-white rounded-full text-sm font-semibold text-center hover:from-indigo-700 hover:to-slate-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
})

Header.displayName = 'Header'
export default Header