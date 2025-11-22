import classNames from 'classnames/bind'
import styles from './Team.module.css'

const cx = classNames.bind(styles)

const Team = () => {
  return (
    <div className={cx('section')}>
      <div className={cx('sectionContainer')}>
        <h1>Team</h1>
      </div>
    </div>
  )
}

export default Team

