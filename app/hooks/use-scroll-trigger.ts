"use client"

import { useState, useEffect, useRef } from "react"

export const useScrollTrigger = (threshold = 0.6, triggerOnce = true) => {
  const [isTriggered, setIsTriggered] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting && entry.intersectionRatio >= threshold

        if (isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsTriggered(true)
          setHasTriggered(true)

          setTimeout(() => {
            setIsTriggered(false)
          }, 100)
        }
      },
      {
        threshold: threshold,
        rootMargin: "0px 0px -10% 0px",
      },
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, triggerOnce, hasTriggered])

  return { elementRef, isTriggered }
}
