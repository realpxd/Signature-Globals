import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback, useMemo } from 'react'
import classNames from 'classnames/bind'
import { NAV_LINKS, COMPANY_INFO } from '../../utils/constants'
import styles from './Header.module.css'

const cx = classNames.bind(styles)

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)
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
  const isScrolledOrNotHome = isScrolled || !isHomePage

  return (
    <header 
      className={cx('header', {
        headerScrolled: isScrolledOrNotHome,
        headerTransparent: !isScrolledOrNotHome
      })}
    >
      <div className={cx({
        navContainer: isScrolledOrNotHome,
        navContainerTransparent: !isScrolledOrNotHome
      })}>
        <div className={cx('navWrapper')}>
          <div className={cx('navContent')}>
            {/* Logo */}
            <Link to="/" className={cx('logoLink')}>
              <div className={cx('logoIcon', {
                logoIconScrolled: isScrolledOrNotHome,
                logoIconTransparent: !isScrolledOrNotHome
              })}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <span className={cx('logoText', {
                  logoTextScrolled: isScrolledOrNotHome,
                  logoTextTransparent: !isScrolledOrNotHome
                })}>
                  Signature Globals
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className={cx('desktopNav')}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cx('navLink', {
                      navLinkActive: active,
                      navLinkInactiveScrolled: !active && isScrolledOrNotHome,
                      navLinkInactiveTransparent: !active && !isScrolledOrNotHome
                    })}
                  >
                    {link.label}
                    {active && (
                      <span className={cx('navLinkActiveIndicator', {
                        navLinkActiveIndicatorScrolled: isScrolledOrNotHome,
                        navLinkActiveIndicatorTransparent: !isScrolledOrNotHome
                      })}></span>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Contact Us Button */}
            <div className={cx('contactButton')}>
              <Link
                to="/contact"
                className={cx({
                  contactButtonScrolled: isScrolledOrNotHome,
                  contactButtonTransparent: !isScrolledOrNotHome
                })}
              >
                <span>Contact us</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cx('mobileMenuButton', {
                mobileMenuButtonScrolled: isScrolledOrNotHome,
                mobileMenuButtonTransparent: !isScrolledOrNotHome
              })}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          >
            <nav className={cx('mobileNav')}>
              {NAV_LINKS.map((link) => {
                const active = isActive(link.path)
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cx('mobileNavLink', {
                      mobileNavLinkActive: active,
                      mobileNavLinkInactive: !active
                    })}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                to="/contact"
                className={cx('mobileContactButton')}
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
}

export default Header

