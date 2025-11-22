import classNames from 'classnames/bind'
import styles from './Services.module.css'

const cx = classNames.bind(styles)

const Services = () => {
  return (
    <div className={cx('section')}>
      <div className={cx('sectionContainer')}>
        <h1>Services</h1>
      </div>
    </div>
  )
}

export default Services

