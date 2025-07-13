"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float, Sphere, RoundedBox, Torus } from "@react-three/drei"
import * as THREE from "three"

interface HeroSceneProps {
  visible: boolean
  progress: number
}

export default function HeroScene({ visible, progress }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const nameRef = useRef<THREE.Group>(null)

  // Create particle system
  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    const colors = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100

      const color = new THREE.Color()
      color.setHSL(0.5 + Math.random() * 0.3, 0.8, 0.6)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Rotate particle field
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05
      particlesRef.current.rotation.x = time * 0.02
    }

    // Floating name animation
    if (nameRef.current) {
      nameRef.current.position.y = Math.sin(time * 0.8) * 0.3
      nameRef.current.rotation.z = Math.sin(time * 0.5) * 0.02
    }

    // Main group gentle rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.01
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef}>
      {/* Particle Field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={2000} array={particles.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={2000} array={particles.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors transparent opacity={0.8} sizeAttenuation />
      </points>

      {/* Central Name Display */}
      <group ref={nameRef}>
        {/* Main Name */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={[0, 2, 0]}
            fontSize={2.5}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Bold.otf"
            letterSpacing={0.2}
          >
            NITHISHKUMAR
          </Text>
        </Float>

        <Float speed={1.8} rotationIntensity={0.05} floatIntensity={0.15}>
          <Text
            position={[0, -0, 0]}
            fontSize={2.5}
            color="#ff6b6b"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Bold.otf"
            letterSpacing={0.2}
          >
            GANESAN
          </Text>
        </Float>

        {/* Subtitle */}
        <Float speed={1.5} rotationIntensity={0.03} floatIntensity={0.1}>
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.8}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Regular.otf"
            letterSpacing={0.1}
          >
            FULL-STACK DEVELOPER
          </Text>
        </Float>

        {/* Tagline */}
        <Float speed={1.2} rotationIntensity={0.02} floatIntensity={0.08}>
          <Text
            position={[0, -2.2, 0]}
            fontSize={0.4}
            color="#a0a0a0"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Regular.otf"
            maxWidth={12}
            textAlign="center"
          >
            Crafting digital experiences with React, Python & MongoDB
          </Text>
        </Float>
      </group>

      {/* Orbiting Elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 8
        return (
          <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.3} floatIntensity={0.2}>
            <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.3, Math.sin(angle) * 2]}>
              <Sphere args={[0.2]}>
                <meshStandardMaterial
                  color={`hsl(${i * 45}, 80%, 60%)`}
                  emissive={`hsl(${i * 45}, 80%, 30%)`}
                  emissiveIntensity={0.5}
                />
              </Sphere>

              {/* Orbital rings */}
              <Torus args={[0.4, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                  color={`hsl(${i * 45}, 80%, 60%)`}
                  emissive={`hsl(${i * 45}, 80%, 30%)`}
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.6}
                />
              </Torus>
            </group>
          </Float>
        )
      })}

      {/* Central Core */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.3}>
        <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00aaaa"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </RoundedBox>
      </Float>

      {/* Ambient Glow */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#00ffff" distance={20} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff6b6b" distance={15} />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#4ecdc4" distance={15} />
    </group>
  )
}
