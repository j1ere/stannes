"use client"

import { useState, useEffect } from "react"

interface TypeWriterProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export default function TypeWriter({
  text,
  speed = 50,
  delay = 0,
  className = "",
  onComplete = () => {},
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const startTimeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(startTimeout)
    } else if (currentIndex === text.length && !isTypingComplete) {
      onComplete()
      setIsTypingComplete(true)

      const hideTimeout = setTimeout(() => {
        setShowCursor(false)
      }, 1000)

      return () => clearTimeout(hideTimeout)
    }
  }, [currentIndex, text, speed, isTypingComplete, onComplete])

  useEffect(() => {
    if (!isTypingComplete) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)

      return () => clearInterval(cursorInterval)
    }
  }, [isTypingComplete])

  return (
    <span className={className}>
      {displayText}
      {!isTypingComplete && (
        <span
          className={`inline-block w-1 h-8 md:h-12 bg-gradient-to-b from-purple-400 to-pink-400 ml-1 ${
            showCursor ? "opacity-100" : "opacity-0"
          } transition-opacity duration-100`}
        ></span>
      )}
    </span>
  )
}
