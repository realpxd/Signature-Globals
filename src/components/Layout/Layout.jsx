import { useLocation } from 'react-router-dom'
import classNames from 'classnames/bind'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ScrollToTop from '../ScrollToTop/ScrollToTop'
import styles from './Layout.module.css'

const cx = classNames.bind(styles)

const Layout = ({ children }) => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className={cx('layout')}>
      <ScrollToTop />
      <Header />
      <main className={cx('main', {
        mainWithPadding: !isHomePage
      })}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout

