import { useEffect, useRef, useState, useCallback } from 'react'

export const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const observerRef = useRef(null)

  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true)
      if (options.once && observerRef.current) {
        observerRef.current.unobserve(entry.target)
      }
    } else if (!options.once) {
      setIsVisible(false)
    }
  }, [options.once])

  useEffect(() => {
    const threshold = options.threshold || 0.1
    const rootMargin = options.rootMargin || '0px'

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    })

    const currentRef = ref.current
    if (currentRef) {
      observerRef.current.observe(currentRef)
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [handleIntersection, options.threshold, options.rootMargin])

  return [ref, isVisible]
}
