"use client"

import { useEffect, useState, useRef } from "react"
import { useThree, useFrame } from "@react-three/fiber"
import { Environment, Stars, Html } from "@react-three/drei"
import { EffectComposer, Bloom, ChromaticAberration, Glitch, Noise } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

// Import all scenes
import HeroScene from "./scenes/hero-scene"
import WorkspaceScene from "./scenes/workspace-scene"
import AboutScene from "./scenes/about-scene"
import ProjectsScene from "./scenes/projects-scene"
import SkillsScene from "./scenes/skills-scene"
import EducationScene from "./scenes/education-scene"
import InterestsScene from "./scenes/interests-scene"
import ContactScene from "./scenes/contact-scene"

// UI Components
import HUD from "./ui/hud"
import MissionControl from "./ui/mission-control"

export default function Portfolio3D() {
  const { camera, scene } = useThree()
  const [currentSection, setCurrentSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const cameraRig = useRef<THREE.Group>(null)
  const ambientRef = useRef<THREE.AmbientLight>(null)

  // Dynamic lighting based on section
  useFrame((state) => {
    if (ambientRef.current) {
      const targetIntensity = currentSection === 0 ? 0.1 : currentSection === 6 ? 0.05 : 0.3
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetIntensity, 0.02)
    }

    // Camera shake for dramatic effect
    if (cameraRig.current && currentSection === 6) {
      cameraRig.current.rotation.x += (Math.random() - 0.5) * 0.001
      cameraRig.current.rotation.y += (Math.random() - 0.5) * 0.001
    }
  })

  useEffect(() => {
    if (!camera || !cameraRig.current) return

    // Setup camera rig
    cameraRig.current.add(camera)
    scene.add(cameraRig.current)

    // Initial camera position
    camera.position.set(0, 0, 10)
    camera.lookAt(0, 0, 0)

    // Create master timeline
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const prog = self.progress
          setProgress(prog)
          const section = Math.min(Math.floor(prog * 9), 8)
          setCurrentSection(section)
        },
      },
    })

    // Section 0: Hero - Floating in space
    masterTL.set(camera.position, { x: 0, y: 0, z: 15 })
    masterTL.set(camera.rotation, { x: 0, y: 0, z: 0 })

    // Section 1: Dive into workspace
    masterTL
      .to(camera.position, {
        duration: 2,
        x: 0,
        y: 2,
        z: 8,
        ease: "power2.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: -0.1,
          y: 0,
          z: 0,
          ease: "power2.inOut",
        },
        "<",
      )

    // Section 2: Circle around desk
    masterTL
      .to(camera.position, {
        duration: 2,
        x: 5,     // previously 8
        y: 2.5,   // previously 4
        z: 10,     // previously 2
        ease: "power2.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: -0.2,   // previously -0.3
          y: 0.8,    // previously 1.2
          z: 0.05,   // previously 0.1
          ease: "power2.inOut",
        },
        "<",
      )
    // Section 3: Zoom into hologram
    masterTL
      .to(camera.position, {
        duration: 2,
        x: 0,
        y: 0,
        z: 3,
        ease: "power2.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: 0,
          y: 0,
          z: 0,
          ease: "power3.inOut",
        },
        "<",
      )

    // Section 4: Projects Matrix View
    masterTL
      // Step 1: Initial wide view
      .to(camera.position, {
        duration: 2,
        x: -12,
        y: 6,
        z: 15,
        ease: "power2.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: 5,
          y: -0.8,
          z: -8,
          ease: "power2.inOut",
        },
        "<" // Run rotation in parallel with position
      )

      // Step 2: Zoom in on same angle
      // .to(camera.position, {
      //   duration: 2,
      //   x: -2,     // move forward toward the scene
      //   y: 8,
      //   z: -12,
      //   ease: "power3.inOut",
      // })

    // Section 5: Neural network dive to server 
    masterTL
      .to(camera.position, {
        duration: 2,
        x: 0,
        y: -5,
        z: 25,
        ease: "power3.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: 0.3,
          y: 0,
          z: 0,
          ease: "power1.inOut",
        },
        "<",
      )

    // Section 6: Neural network animation
    masterTL
      .to(camera.position, {
        duration: 2,
        x: 5,
        y: 10,
        z: 35,
        ease: "power2.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: -0.4,
          y: 0.6,
          z: 0,
          ease: "power2.inOut",
        },
        "<",
      )

    // Section 7: education and cert
    masterTL
      // Focus on education
      .to(camera.position, {
        duration: 2,
        x: -2,
        y: 7,
        z: 65,
        ease: "power3.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: -0.4,
          y: 2,
          z: 0,
          ease: "power3.inOut",
        },
        "<",
      )


    // Section 8: glaxy station
    masterTL
      .to(camera.position, {
        duration: 2,
        x: -2,
        y: 10,
        z: 70,
        ease: "power4.inOut",
      })
      .to(
        camera.rotation,
        {
          duration: 2,
          x: -0.2,
          y: 0,
          z: 0,
          ease: "power4.inOut",
        },
        "<",
      )
      
      //Contact section
    // Contact section (FIXED)
masterTL
  .to(camera.position, {
    duration: 2,
    x: 0,     // center horizontally
    y: 15,    // aligns with <group position={[0, 10, 80]}>
    z: 100,    // 10 units in front of terminal
    ease: "power2.inOut",
  })
  .to(
    camera.rotation,
    {
      duration: 2,
      x: 0,    // facing forward
      y: 0,    // no yaw
      z: 0,   // no roll
      ease: "power2.inOut",
    },
    "<"
  )
  



    setIsReady(true)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      if (cameraRig.current) {
        scene.remove(cameraRig.current)
      }
    }
  }, [camera, scene])

  return (
    <>
      {/* Camera Rig */}
      <group ref={cameraRig} />

      {/* Dynamic Lighting System */}
      <ambientLight ref={ambientRef} intensity={0.1} color="#0a0a2e" />

      {/* Key Lights */}
      <directionalLight
        position={[20, 20, 10]}
        intensity={currentSection <= 2 ? 1.5 : 0.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Accent Lights */}
      <pointLight position={[-15, 10, -10]} intensity={0.8} color="#00ffff" distance={30} />
      <pointLight position={[15, -10, 15]} intensity={0.6} color="#ff6b6b" distance={25} />

      {/* Rim Light */}
      <spotLight
        position={[0, 30, 0]}
        intensity={currentSection >= 6 ? 2 : 0.5}
        color="#ffffff"
        angle={Math.PI / 3}
        penumbra={0.8}
        distance={50}
        castShadow
      />

      {/* Environment */}
      <Environment preset="night" background={false} />
      <Stars radius={300} depth={60} count={8000} factor={7} saturation={0.8} fade={currentSection >= 6} />

      {/* All 3D Scenes */}
      <HeroScene visible={currentSection === 0} progress={progress} />
      <WorkspaceScene visible={currentSection >= 1 && currentSection <= 2} progress={progress} />
      <AboutScene visible={currentSection === 3} progress={progress} />
      <ProjectsScene visible={currentSection === 4} progress={progress} />
      <SkillsScene visible={currentSection === 5} progress={progress} />
      <EducationScene visible={currentSection === 6} progress={progress} />
      <InterestsScene visible={currentSection === 7} progress={progress} />
      <ContactScene visible={currentSection >= 8} progress={progress} />

      {/* Post-Processing Effects */}
      {currentSection === 8 && (
        <Glitch
          delay={[1.5, 3.5]}
          duration={[0.6, 1.0]}
          strength={[0.3, 1.0]}
          mode={0}
          // Convert array to Vector2 type
          delay={new THREE.Vector2(1.5, 3.5)}
          duration={new THREE.Vector2(0.6, 1.0)}
          strength={new THREE.Vector2(0.3, 1.0)}
        />
      )}

      {/* UI Overlay */}
      {isReady && (
        <Html fullscreen>
          <HUD currentSection={currentSection} progress={progress} />
          <MissionControl currentSection={currentSection} />
        </Html>
      )}
    </>
  )
}
