import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { COMPANY_INFO } from '../../utils/constants'
import classNames from 'classnames/bind'
import styles from './About.module.css'

const cx = classNames.bind(styles)

const About = () => {
  const [storyRef, storyVisible] = useIntersectionObserver({ once: true })
  const [missionRef, missionVisible] = useIntersectionObserver({ once: true })
  const [valuesRef, valuesVisible] = useIntersectionObserver({ once: true })
  const [officeRef, officeVisible] = useIntersectionObserver({ once: true })
  const [teamRef, teamVisible] = useIntersectionObserver({ once: true })

  const values = [
    {
      icon: (
        <svg className={cx('valueIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Quality',
      description: 'Uncompromising commitment to excellence in every project'
    },
    {
      icon: (
        <svg className={cx('valueIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Timely Delivery',
      description: 'We honor our commitments and deliver on time'
    },
    {
      icon: (
        <svg className={cx('valueIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Sustainability',
      description: 'Environmentally responsible development practices'
    }
  ]

  return (
    <div>
      <section className={cx('heroSection')}>
        <div className={cx('sectionContainer')}>
          <h1 className={cx('heroTitle')}>About us</h1>
        </div>
      </section>

      <section className={cx('section')}>
        <div className={cx('sectionContainer')}>
          <div 
            ref={storyRef}
            className={cx('contentGrid', {
              sectionVisible: storyVisible,
              sectionHidden: !storyVisible
            })}
          >
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80" 
                alt="Modern living room" 
                className={cx('contentImage')}
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            <div>
              <h2 className={cx('contentTitle')}>Our Story</h2>
              <p className={cx('contentText')}>
                Every dream deserves a home. At Signature Globals, we match your vision with exceptional properties, making your ideal living space a reality. Established in 2014, we have significantly transformed Gurugram's real estate landscape with our commitment to quality, innovative designs, and customer-centric approach.
              </p>
              <p className={cx('contentText')}>
                With a strong portfolio of residential and commercial projects, Signature Global emphasizes sustainability and timely delivery. Our developments are strategically located, offering excellent connectivity and accessibility, making them highly attractive to both buyers and investors.
              </p>
              <div style={{ marginTop: 'var(--spacing-lg)' }}>
                <div className={cx('statsValue')}>63k+</div>
                <p className={cx('statsLabel')}>satisfied clients since inception</p>
              </div>
            </div>
          </div>

          <div 
            ref={missionRef}
            className={cx('missionVisionGrid', {
              sectionVisible: missionVisible,
              sectionHidden: !missionVisible
            })}
          >
            <div className={cx('missionVisionCard')}>
              <h3 className={cx('missionVisionTitle')}>Our Mission</h3>
              <p className={cx('missionVisionText')}>
                To create exceptional living spaces that blend luxury, comfort, and sustainability. We are committed to delivering quality homes that exceed expectations while maintaining the highest standards of construction and design.
              </p>
            </div>
            <div className={cx('missionVisionCard')}>
              <h3 className={cx('missionVisionTitle')}>Our Vision</h3>
              <p className={cx('missionVisionText')}>
                To be the most trusted and preferred real estate developer in the region, known for innovation, integrity, and excellence. We envision a future where every family finds their perfect home with us.
              </p>
            </div>
          </div>

          <div 
            ref={valuesRef}
            className={cx('valuesSection', {
              sectionVisible: valuesVisible,
              sectionHidden: !valuesVisible
            })}
          >
            <h2 className={cx('valuesTitle')}>Our Core Values</h2>
            <div className={cx('valuesGrid')}>
              {values.map((value) => (
                <div key={value.title} className={cx('valueCard')}>
                  <div className={cx('valueIconContainer')}>
                    {value.icon}
                  </div>
                  <h3 className={cx('valueTitle')}>{value.title}</h3>
                  <p className={cx('valueDescription')}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div 
            ref={officeRef}
            className={cx('officeSection', {
              sectionVisible: officeVisible,
              sectionHidden: !officeVisible
            })}
          >
            <h2 className={cx('officeTitle')}>Our Offices</h2>
            <p className={cx('officeText')}>
              With our corporate office in Gurugram, Signature Globals is strategically positioned to serve the real estate needs of the region. Our location is staffed with local experts ready to assist you in your real estate journey.
            </p>
            <div className={cx('officeImageContainer')}>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80" 
                alt="Office" 
                className={cx('officeImage')}
                loading="lazy"
                width="1200"
                height="400"
              />
              <div className={cx('officeOverlay')}>
                <div className={cx('officeCard')}>
                  <h3 className={cx('officeCardTitle')}>Gurugram, Haryana</h3>
                  <div className={cx('officeCardInfo')}>
                    <p className={cx('officeCardItem')}>
                      <svg className={cx('officeCardIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{COMPANY_INFO.email}</span>
                    </p>
                    <p className={cx('officeCardItem')}>
                      <svg className={cx('officeCardIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{COMPANY_INFO.phone.primary}</span>
                    </p>
                    <p className={cx('officeCardItem')}>
                      <svg className={cx('officeCardIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{COMPANY_INFO.address}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            ref={teamRef}
            className={cx({
              sectionVisible: teamVisible,
              sectionHidden: !teamVisible
            })}
          >
            <div className={cx('teamHeader')}>
              <div>
                <h2 className={cx('teamTitle')}>Meet Our Agents</h2>
                <p className={cx('teamDescription')}>
                  The Signature Globals team is a diverse group of professionals dedicated to making your real estate dreams a reality. Each member brings a unique perspective and a shared passion for client satisfaction.
                </p>
              </div>
            </div>
            <div className={cx('teamGrid')}>
              {[
                { name: 'Priya Sharma', role: 'Senior Sales Executive', experience: '10+ years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
                { name: 'Rajesh Kumar', role: 'Property Consultant', experience: '8+ years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
                { name: 'Anjali Mehta', role: 'Business Development Manager', experience: '12+ years', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' }
              ].map((member) => (
                <div key={member.name} className={cx('teamMember')}>
                  <div className={cx('teamMemberImage')}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      loading="lazy"
                      width="400"
                      height="400"
                    />
                  </div>
                  <h3 className={cx('teamMemberName')}>{member.name}</h3>
                  <p className={cx('teamMemberRole')}>{member.role}</p>
                  <p className={cx('teamMemberExperience')}>{member.experience} experience</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

