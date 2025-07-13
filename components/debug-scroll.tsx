"use client"

import { useEffect, useState } from "react"

export default function DebugScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [documentHeight, setDocumentHeight] = useState(0)

  useEffect(() => {
    const updateScroll = () => {
      setScrollY(window.scrollY)
      setWindowHeight(window.innerHeight)
      setDocumentHeight(document.documentElement.scrollHeight)
    }

    updateScroll()
    window.addEventListener("scroll", updateScroll)
    window.addEventListener("resize", updateScroll)

    return () => {
      window.removeEventListener("scroll", updateScroll)
      window.removeEventListener("resize", updateScroll)
    }
  }, [])

  // Only show in development
  if (process.env.NODE_ENV === "production") return null

  return (
    <div className="debug-scroll">
      <div>Scroll Y: {scrollY}px</div>
      <div>Window Height: {windowHeight}px</div>
      <div>Document Height: {documentHeight}px</div>
      <div>Progress: {((scrollY / (documentHeight - windowHeight)) * 100).toFixed(1)}%</div>
    </div>
  )
}
