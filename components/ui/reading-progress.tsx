"use client"

import { useEffect, useState } from "react"

/**
 * A component that displays a reading progress bar at the top of the page
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // Calculate how far the user has scrolled
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollTop / docHeight) * 100
      setProgress(scrollPercentage)
    }

    // Initial call
    updateProgress()

    // Add scroll event listener
    window.addEventListener("scroll", updateProgress)

    // Clean up
    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <div 
        className="h-full bg-gradient-to-r from-blue-600 to-purple-600" 
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
