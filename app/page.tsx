"use client"

import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import Portfolio3D from "@/components/portfolio-3d"
import LoadingScreen from "@/components/loading-screen"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { OrbitControls } from "@react-three/drei"
import RotateOverlay from "@/components/RotateOverlay"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
       <RotateOverlay />
      {/* Scroll trigger container */}
      <div className="relative z-10 h-[800vh]" />

      {/* Fixed 3D Canvas */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          shadows
        >
           <OrbitControls />
          <Suspense fallback={null}>
            <Portfolio3D />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}
