import { memo, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'

const Layout = memo(({ children }) => {
  const location = useLocation()
  const isHomePage = useMemo(() => location.pathname === '/', [location.pathname])
  const mainClassName = useMemo(() => `flex-grow ${isHomePage ? '' : 'pt-16 md:pt-20'}`, [isHomePage])

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className={mainClassName}>
        {children}
      </main>
      <Footer />
    </div>
  )
})

Layout.displayName = 'Layout'

export default Layout


