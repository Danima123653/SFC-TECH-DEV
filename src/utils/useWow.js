import { useEffect } from 'react'

/**
 * WOW.js style scroll-triggered animation engine for React
 * Supports .wow with animation classes (.fadeInUp, .fadeInDown, .fadeInLeft, .fadeInRight, .zoomIn, .bounceIn, etc.)
 * Supports data-wow-delay, data-wow-duration, data-wow-offset
 */
export function useWow() {
  useEffect(() => {
    const animateElement = (el) => {
      const delay = el.getAttribute('data-wow-delay')
      const duration = el.getAttribute('data-wow-duration')
      const iteration = el.getAttribute('data-wow-iteration')

      if (delay) el.style.animationDelay = delay
      if (duration) el.style.animationDuration = duration
      if (iteration) el.style.animationIterationCount = iteration

      el.classList.add('animated')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateElement(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08
      }
    )

    const observeAll = () => {
      const elements = document.querySelectorAll('.wow:not(.animated)')
      elements.forEach((el) => {
        observer.observe(el)
      })
    }

    // Initial scan
    observeAll()

    // Watch for dynamically rendered items (tabs, filters, modals)
    const mutationObserver = new MutationObserver(() => {
      observeAll()
    })

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])
}
