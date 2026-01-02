"use client"

import { useEffect } from "react"

interface ConfettiBurstProps {
  trigger: boolean
  duration?: number
}

export default function ConfettiBurst({ trigger, duration = 3000 }: ConfettiBurstProps) {
  const colors = [
    "#10b981",
    "#059669",
    "#f59e0b",
    "#d97706",
    "#22c55e",
    "#16a34a",
    "#f97316",
    "#ea580c",
    "#fbbf24",
    "#34d399",
  ]

  const createConfettiBurst = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default

      const end = Date.now() + duration

      const burst = (options: any) => {
        confetti({
          ...options,
          colors: colors,
          disableForReducedMotion: false,
        })
      }

      burst({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        shapes: ["square", "circle"],
        scalar: 1.2,
        drift: 1,
        gravity: 0.8,
        ticks: 200,
      })

      burst({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        shapes: ["square", "circle"],
        scalar: 1.2,
        drift: -1,
        gravity: 0.8,
        ticks: 200,
      })

      setTimeout(() => {
        burst({
          particleCount: 100,
          angle: 90,
          spread: 45,
          origin: { x: 0.5, y: 0.5 },
          shapes: ["square", "circle"],
          scalar: 0.8,
          gravity: 0.6,
          ticks: 150,
        })
      }, 200)

      const burstInterval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(burstInterval)
          return
        }

        burst({
          particleCount: 30,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          shapes: ["square", "circle"],
          scalar: 1.0,
          drift: 1,
          gravity: 0.8,
          ticks: 150,
        })

        burst({
          particleCount: 30,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          shapes: ["square", "circle"],
          scalar: 1.0,
          drift: -1,
          gravity: 0.8,
          ticks: 150,
        })

        if (Math.random() > 0.7) {
          setTimeout(() => {
            burst({
              particleCount: 50,
              angle: 90,
              spread: 45,
              origin: { x: 0.5, y: 0.4 },
              shapes: ["square", "circle"],
              scalar: 0.8,
              gravity: 0.6,
              ticks: 120,
            })
          }, 100)
        }
      }, 500)

      setTimeout(() => {
        clearInterval(burstInterval)
      }, duration)
    } catch (error) {
      console.error("Confetti error:", error)
    }
  }

  useEffect(() => {
    if (trigger) {
      createConfettiBurst()
    }
  }, [trigger, duration])

  return null
}
