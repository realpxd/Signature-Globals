import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './NotFound.module.css'

const cx = classNames.bind(styles)

const NotFound = () => {
  return (
    <div className={cx('notFoundContainer')}>
      <div className={cx('notFoundContent')}>
        <div>
          <h1 className={cx('notFoundTitle')}>
            404
          </h1>
          
          <div className={cx('notFoundIconContainer')}>
            <div className={cx('notFoundIconCircle')}>
              <svg className={cx('notFoundIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>

          <h2 className={cx('notFoundHeading')}>
            Property Not Found
          </h2>
          <p className={cx('notFoundMessage')}>
            The page you're looking for seems to have moved. Let's help you find your perfect property instead.
          </p>

          <div className={cx('notFoundActions')}>
            <Link
              to="/"
              className={cx('notFoundButtonPrimary')}
            >
              Go Home
            </Link>
            <Link
              to="/properties"
              className={cx('notFoundButtonSecondary')}
            >
              Browse Properties
            </Link>
          </div>

          <div className={cx('notFoundDots')}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={cx('notFoundDot')}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound

