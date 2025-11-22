import classNames from 'classnames/bind'
import styles from './Properties.module.css'

const cx = classNames.bind(styles)

const Properties = () => {
  return (
    <div className={cx('section')}>
      <div className={cx('sectionContainer')}>
        <h1>Properties</h1>
      </div>
    </div>
  )
}

export default Properties

