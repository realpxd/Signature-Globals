import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import { NAV_LINKS } from '../../utils/constants'
import styles from './Header.module.css'

const cx = classNames.bind(styles)
const SCROLL_THRESHOLD = 80

const Header = () => {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const lastScrollRef = useRef(false)
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  // Scroll listener with rAF
  useEffect(() => {
    let ticking = false
    const update = () => {
      const next = window.scrollY > SCROLL_THRESHOLD
      if (lastScrollRef.current !== next) {
        lastScrollRef.current = next
        setIsScrolled(next)
      }
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    // initial
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll
  useEffect(() => {
    const body = document.body
    if (isMenuOpen) body.style.overflow = 'hidden'
    else body.style.overflow = ''
    return () => {
      body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Escape key
  useEffect(() => {
    if (!isMenuOpen) return
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMenuOpen])

  const activePath = location.pathname
  const isActive = useCallback(
    (p) => (p === '/' ? activePath === '/' : activePath.startsWith(p)),
    [activePath]
  )

  const isHome = activePath === '/'
  const solid = isScrolled || !isHome

  const toggleMenu = useCallback(() => setIsMenuOpen((p) => !p), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  const desktopLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => {
        const active = isActive(link.path)
        return (
          <Link
            key={link.path}
            to={link.path}
            aria-current={active ? 'page' : undefined}
            className={cx('navLink', {
              navLinkActive: active,
              navLinkInactiveScrolled: !active && solid,
              navLinkInactiveTransparent: !active && !solid,
              reduceMotion: prefersReducedMotion.current
            })}
          >
            {link.label}
            {active && (
              <span
                className={cx('navLinkActiveIndicator', {
                  navLinkActiveIndicatorScrolled: solid,
                  navLinkActiveIndicatorTransparent: !solid
                })}
              />
            )}
          </Link>
        )
      }),
    [isActive, solid]
  )

  const mobileLinks = useMemo(
    () =>
      NAV_LINKS.map((link) => {
        const active = isActive(link.path)
        return (
          <Link
            key={link.path}
            to={link.path}
            onClick={closeMenu}
            aria-current={active ? 'page' : undefined}
            className={cx('mobileNavLink', {
              mobileNavLinkActive: active,
              mobileNavLinkInactive: !active
            })}
          >
            {link.label}
          </Link>
        )
      }),
    [isActive, closeMenu]
  )

  return (
    <header
      className={cx('header', {
        headerScrolled: solid,
        headerTransparent: !solid,
        reduceMotion: prefersReducedMotion.current
      })}
      role="banner"
    >
      <div
        className={cx({
          navContainer: solid,
          navContainerTransparent: !solid
        })}
      >
        <div className={cx('navWrapper')}>
          <div className={cx('navContent')}>
            {/* Logo */}
            <Link to="/" className={cx('logoLink')} aria-label="Go to homepage">
              <div
                className={cx('logoIcon', {
                  logoIconScrolled: solid,
                  logoIconTransparent: !solid
                })}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <span
                className={cx('logoText', {
                  logoTextScrolled: solid,
                  logoTextTransparent: !solid
                })}
              >
                Signature Globals
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className={cx('desktopNav')} aria-label="Primary">
              {desktopLinks}
            </nav>

            {/* Contact */}
            <div className={cx('contactButton')}>
              <Link
                to="/contact"
                className={cx({
                  contactButtonScrolled: solid,
                  contactButtonTransparent: !solid
                })}
              >
                <span>Contact us</span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className={cx('mobileMenuButton', {
                mobileMenuButtonScrolled: solid,
                mobileMenuButtonTransparent: !solid
              })}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            className={cx('mobileMenu', {
              mobileMenuOpen: isMenuOpen,
              mobileMenuClosed: !isMenuOpen
            })}
            id="mobile-nav"
          >
            <nav className={cx('mobileNav')} aria-label="Mobile">
              {mobileLinks}
              <Link
                to="/contact"
                className={cx('mobileContactButton')}
                onClick={closeMenu}
              >
                Contact us
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header