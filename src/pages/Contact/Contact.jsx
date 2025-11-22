import classNames from 'classnames/bind'
import styles from './Contact.module.css'

const cx = classNames.bind(styles)

const Contact = () => {
  return (
    <div className={cx('section')}>
      <div className={cx('sectionContainer')}>
        <h1>Contact</h1>
      </div>
    </div>
  )
}

export default Contact

