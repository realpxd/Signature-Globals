import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { HERO_IMAGES, STATS } from '../../utils/constants'
import styles from './Home.module.css'

const cx = classNames.bind(styles)

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isImageVisible, setIsImageVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [aboutRef, aboutVisible] = useIntersectionObserver({ once: true })
  const [propertiesRef, propertiesVisible] = useIntersectionObserver({ once: true })
  const [statsRef, statsVisible] = useIntersectionObserver({ once: true })
  const [whyChooseRef, whyChooseVisible] = useIntersectionObserver({ once: true })
  const [commitmentRef, commitmentVisible] = useIntersectionObserver({ once: true })
  const [mapRef, mapVisible] = useIntersectionObserver({ once: true })

  const currentHero = useMemo(() => HERO_IMAGES[currentImageIndex], [currentImageIndex])

  useEffect(() => {
    let timeoutId1, timeoutId2
    const interval = setInterval(() => {
      setIsImageVisible(false)
      setIsTransitioning(true)
      
      timeoutId1 = setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
        timeoutId2 = setTimeout(() => {
          setIsImageVisible(true)
          setIsTransitioning(false)
        }, 500)
      }, 700)
    }, 4000)

    return () => {
      clearInterval(interval)
      if (timeoutId1) clearTimeout(timeoutId1)
      if (timeoutId2) clearTimeout(timeoutId2)
    }
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className={cx('heroSection')}>
        <div 
          className={cx('transitionOverlay', {
            transitionOverlayVisible: isTransitioning,
            transitionOverlayHidden: !isTransitioning
          })}
          aria-hidden="true"
        />

        {HERO_IMAGES.map((hero, index) => (
          <div
            key={`hero-${index}`}
            className={cx('heroImage', {
              heroImageVisible: index === currentImageIndex && isImageVisible,
              heroImageHidden: index !== currentImageIndex || !isImageVisible
            })}
            style={{
              backgroundImage: `url(${hero.image})`
            }}
            aria-hidden={index !== currentImageIndex}
          >
            <div className={cx('heroGradient')} />
            <div className={cx('heroOverlay')} />
          </div>
        ))}

        <div className={cx('heroTitleContainer')}>
          <h1 className={cx('heroTitle')}>
            Signature Globals
          </h1>
        </div>

        <div className={cx('heroBottomContent')}>
          <div className={cx('heroBottomGrid')}>
            <div className={cx('heroDescription')}>
              <p className={cx('heroDescriptionText')}>
                {currentHero.description}
              </p>
            </div>

            <div className={cx('heroInfo')}>
              <h2 className={cx('heroInfoTitle')}>{currentHero.title}</h2>
              <p className={cx('heroInfoSubtitle')}>{currentHero.subtitle}</p>
              <p className={cx('heroInfoPrice')}>{currentHero.price}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Preview Section */}
      <section 
        ref={aboutRef}
        className={cx('section', 'sectionWhite', {
          sectionVisible: aboutVisible,
          sectionHidden: !aboutVisible
        })}
      >
        <div className={cx('sectionContainer')}>
          <h2 className={cx('sectionTitle')}>About Us</h2>
          <div className={cx('aboutGrid')}>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80" 
                alt="Modern living room" 
                className={cx('aboutImage')}
                loading="lazy"
                width="800"
                height="600"
              />
            </div>
            <div className={cx('aboutContent')}>
              <p className={cx('aboutText')}>
                Every dream deserves a home. At Signature Globals, we match your vision with exceptional properties, making your ideal living space a reality. Established in 2014, we have significantly transformed Gurugram's real estate landscape with our commitment to quality, innovative designs, and customer-centric approach.
              </p>
              <p className={cx('aboutText')}>
                With a strong portfolio of residential and commercial projects, Signature Global emphasizes sustainability and timely delivery. Our developments are strategically located, offering excellent connectivity and accessibility, making them highly attractive to both buyers and investors.
              </p>
              <div>
                <div className={cx('aboutStats')}>63k+</div>
                <p className={cx('aboutStatsLabel')}>satisfied clients since inception</p>
                <Link 
                  to="/about"
                  className={cx('aboutLink')}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section 
        ref={propertiesRef}
        className={cx('section', 'sectionGray', {
          sectionVisible: propertiesVisible,
          sectionHidden: !propertiesVisible
        })}
      >
        <div className={cx('sectionContainer')}>
          <div className={cx('propertiesHeader')}>
            <h2 className={cx('propertiesTitle')}>Featured Properties</h2>
            <p className={cx('propertiesSubtitle')}>
              Discover our premium residential projects designed for modern living
            </p>
          </div>
          
          <div className={cx('propertiesGrid')}>
            <div className={cx('propertyCard')}>
              <div className={cx('propertyImageContainer')}>
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80" 
                  alt="Cloverdale SPR" 
                  className={cx('propertyImage')}
                  loading="lazy"
                  width="600"
                  height="400"
                />
                <div className={cx('propertyBadge')}>
                  New Launch
                </div>
              </div>
              <div className={cx('propertyContent')}>
                <h3 className={cx('propertyTitle')}>Cloverdale SPR</h3>
                <p className={cx('propertyLocation')}>
                  <svg className={cx('whyChooseIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Sector 71, Gurugram
                </p>
                <div className={cx('propertyDetails')}>
                  <p className={cx('propertyDetail')}>3, 3.5 & 4.5 BHK Luxury Apartments</p>
                  <p className={cx('propertyDetail')}>2,200 to 3,200 sq. ft.</p>
                  <p className={cx('propertyDetail')}>Premium amenities & world-class facilities</p>
                </div>
                <p className={cx('propertyPrice')}>Starting from ₹3.88 Cr*</p>
                <Link 
                  to="/properties"
                  className={cx('propertyLink')}
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className={cx('propertyCard')}>
              <div className={cx('propertyImageContainer')}>
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" 
                  alt="Titanium SPR" 
                  className={cx('propertyImage')}
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
              <div className={cx('propertyContent')}>
                <h3 className={cx('propertyTitle')}>Titanium SPR</h3>
                <p className={cx('propertyLocation')}>
                  <svg className={cx('whyChooseIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Sector 71, Gurugram
                </p>
                <div className={cx('propertyDetails')}>
                  <p className={cx('propertyDetail')}>3, 3.5 & 4.5 BHK Luxury Apartments</p>
                  <p className={cx('propertyDetail')}>2,200 to 3,750 sq. ft.</p>
                  <p className={cx('propertyDetail')}>Spacious layouts with modern design</p>
                </div>
                <p className={cx('propertyPrice')}>Starting from ₹3.88 Cr*</p>
                <Link 
                  to="/properties"
                  className={cx('propertyLink')}
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className={cx('propertyCard')}>
              <div className={cx('propertyImageContainer')}>
                <img 
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80" 
                  alt="Daxin Vistas" 
                  className={cx('propertyImage')}
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </div>
              <div className={cx('propertyContent')}>
                <h3 className={cx('propertyTitle')}>Daxin Vistas</h3>
                <p className={cx('propertyLocation')}>
                  <svg className={cx('whyChooseIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Sohna, South of Gurugram
                </p>
                <div className={cx('propertyDetails')}>
                  <p className={cx('propertyDetail')}>3 BHK + Study Apartments</p>
                  <p className={cx('propertyDetail')}>Premium Location</p>
                  <p className={cx('propertyDetail')}>Excellent connectivity & accessibility</p>
                </div>
                <p className={cx('propertyPrice')}>Starting from ₹1.99 Cr*</p>
                <Link 
                  to="/properties"
                  className={cx('propertyLink')}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
            <Link
              to="/properties"
              className={cx('aboutLink')}
            >
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Signature Globals? Section */}
      <section 
        ref={whyChooseRef}
        className={cx('section', 'sectionWhite', {
          sectionVisible: whyChooseVisible,
          sectionHidden: !whyChooseVisible
        })}
      >
        <div className={cx('sectionContainer')}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <h2 className={cx('sectionTitle')}>Why Choose Signature Globals?</h2>
            <p className={cx('propertiesSubtitle')}>
              Experience the difference with a developer committed to excellence and customer satisfaction.
            </p>
          </div>
          <div className={cx('whyChooseGrid')}>
            <div>
              <svg className={cx('whyChooseIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={cx('whyChooseTitle')}>Unmatched Quality</h3>
              <p className={cx('commitmentText')}>
                We use premium materials and adhere to the highest construction standards to deliver homes that last.
              </p>
            </div>
            <div>
              <svg className={cx('whyChooseIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className={cx('whyChooseTitle')}>Innovative Designs</h3>
              <p className={cx('commitmentText')}>
                Our projects feature contemporary architecture and thoughtful layouts for modern living.
              </p>
            </div>
            <div>
              <svg className={cx('whyChooseIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2 1.343 2 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={cx('whyChooseTitle')}>Customer-Centric Approach</h3>
              <p className={cx('commitmentText')}>
                Your satisfaction is our priority, from initial inquiry to post-possession support.
              </p>
            </div>
            <div>
              <svg className={cx('whyChooseIcon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className={cx('whyChooseTitle')}>Sustainable Living</h3>
              <p className={cx('commitmentText')}>
                We integrate green building practices and sustainable solutions for a better future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section 
        ref={commitmentRef}
        className={cx('section', 'sectionPrimary', {
          sectionVisible: commitmentVisible,
          sectionHidden: !commitmentVisible
        })}
      >
        <div className={cx('sectionContainer')}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <h2 className={cx('sectionTitle')} style={{ color: 'var(--color-bg-white)' }}>Our Commitment to You</h2>
            <p className={cx('propertiesSubtitle')} style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Building trust, delivering excellence, and creating lasting value for every client.
            </p>
          </div>
          <div className={cx('whyChooseGrid')}>
            <div style={{ textAlign: 'center' }}>
              <svg className={cx('whyChooseIcon')} style={{ width: '4rem', height: '4rem', margin: '0 auto var(--spacing-md)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <h3 className={cx('whyChooseTitle')} style={{ color: 'var(--color-bg-white)' }}>Transparency</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Clear communication and honest dealings at every stage.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <svg className={cx('whyChooseIcon')} style={{ width: '4rem', height: '4rem', margin: '0 auto var(--spacing-md)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h3 className={cx('whyChooseTitle')} style={{ color: 'var(--color-bg-white)' }}>Integrity</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Upholding ethical standards in all our business practices.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <svg className={cx('whyChooseIcon')} style={{ width: '4rem', height: '4rem', margin: '0 auto var(--spacing-md)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2 2m-2-2l-2 2m0 0l-2 2m2-2L10 9m2 2l2-2m2-2l2 2m0 0l2 2m-2-2L14 9m-2 2v4m-4 0h8m-4 0v4" />
              </svg>
              <h3 className={cx('whyChooseTitle')} style={{ color: 'var(--color-bg-white)' }}>Innovation</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Continuously seeking new ways to enhance living experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className={cx('section', 'sectionPrimary', {
          sectionVisible: statsVisible,
          sectionHidden: !statsVisible
        })}
      >
        <div className={cx('sectionContainer')}>
          <div className={cx('statsGrid')}>
            {STATS.map((stat, index) => (
              <div key={stat.label}>
                <div className={cx('statValue')}>{stat.value}</div>
                <div className={cx('statLabel')}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gurgaon Sector Map Section */}
      <section 
        ref={mapRef}
        className={cx('section', 'sectionWhite', {
          sectionVisible: mapVisible,
          sectionHidden: !mapVisible
        })}
      >
        <div className={cx('sectionContainer')}>
          <div className={cx('mapHeader')}>
            <h2 className={cx('mapTitle')}>Gurugram Sector Map</h2>
            <p className={cx('mapSubtitle')}>
              Explore our strategic locations across Gurugram's prime sectors
            </p>
          </div>
          <div className={cx('mapImageContainer')}>
            <img
              src="https://www.abcbuildcon.in/app/webroot/img/upload/maps/main/f38207af910e788cdb44a71aaa4a19df.jpg"
              alt="Gurugram Sector Map"
              className={cx('mapImage')}
              loading="lazy"
              width="1200"
              height="800"
            />
          </div>
          <div className={cx('mapSectors')}>
            <p className={cx('mapSectorsText')}>Our projects are strategically located in prime sectors of Gurugram including:</p>
            <div className={cx('mapSectorsList')}>
              {['Sector 71', 'Sector 37D', 'Sohna', 'South City-1'].map((sector) => (
                <span key={sector} className={cx('mapSectorTag')}>
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

