"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float, Sphere, Torus } from "@react-three/drei"
import type * as THREE from "three"

interface InterestsSceneProps {
  visible: boolean
  progress: number
}

const interests = [
  {
    name: "Robotics & AI",
    icon: "🤖",
    color: "#ff6b6b",
    position: [-6, 4, 0] as [number, number, number],
    description: "Building intelligent machines and automation systems",
  },
  {
    name: "Machine Learning",
    icon: "🧠",
    color: "#4ecdc4",
    position: [6, 2, -3] as [number, number, number],
    description: "Deep learning and neural network architectures",
  },
  {
    name: "Space Technology",
    icon: "🚀",
    color: "#45b7d1",
    position: [-4, -2, 4] as [number, number, number],
    description: "Aerospace engineering and space exploration",
  },
  {
    name: "Cybersecurity",
    icon: "🛡️",
    color: "#96ceb4",
    position: [4, -3, 2] as [number, number, number],
    description: "Ethical hacking and digital security systems",
  },
  {
    name: "Financial Tech",
    icon: "💰",
    color: "#ffd93d",
    position: [0, 5, -2] as [number, number, number],
    description: "Trading algorithms and fintech solutions",
  },
  {
    name: "IoT Systems",
    icon: "🌐",
    color: "#ff8b94",
    position: [0, -7, 4] as [number, number, number],
    description: "Internet of Things and connected devices",
  },
]

export default function InterestsScene({ visible, progress }: InterestsSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const galaxyRef = useRef<THREE.Group>(null)
  const asteroidsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Galaxy rotation
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y = time * 0.1
      galaxyRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
    }

    // Asteroid field movement
    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.z = time * 0.05
      asteroidsRef.current.rotation.x = time * 0.03
    }

    // Main group cosmic drift
    if (groupRef.current) {
      groupRef.current.position.z = 50 + Math.sin(time * 0.2) * 3
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={[0, 4, 10]}>
      {/* Scene Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 10, 0]}
          fontSize={3}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.otf"
          letterSpacing={0.1}
        >
          INTERESTS GALAXY
        </Text>
      </Float>

      {/* Subtitle */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, 8.5, 0]}
          fontSize={0.7}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.otf"
        >
          Exploring the Infinite Cosmos of Curiosity
        </Text>
      </Float>

      {/* Interest Galaxy */}
      <group ref={galaxyRef}>
        {interests.map((interest, index) => (
          <Float key={interest.name} speed={1.5 + index * 0.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <group position={interest.position}>
              {/* Interest Planet */}
              <Sphere args={[1.2]}>
                <meshStandardMaterial
                  color={interest.color}
                  emissive={interest.color}
                  emissiveIntensity={0.4}
                  roughness={0.3}
                  metalness={0.7}
                  transparent
                  opacity={0.9}
                />
              </Sphere>

              {/* Planet Atmosphere */}
              <Sphere args={[1.5]}>
                <meshStandardMaterial
                  color={interest.color}
                  emissive={interest.color}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.3}
                />
              </Sphere>

              {/* Interest Label */}
              <Text
                position={[0, -2.2, 0]}
                fontSize={0.5}
                color={interest.color}
                anchorX="center"
                anchorY="middle"
                font="/fonts/Geist-Bold.otf"
              >
                {interest.name}
              </Text>

              {/* Description */}
              <Text
                position={[0, -2.8, 0]}
                fontSize={0.25}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Geist-Regular.otf"
                maxWidth={6}
                textAlign="center"
              >
                {interest.description}
              </Text>

              {/* Orbital Rings */}
              {[2, 2.5, 3].map((radius, i) => (
                <Torus key={i} args={[radius, 0.03]} rotation={[Math.PI / 2 + i * 0.3, 0, 0]}>
                  <meshStandardMaterial
                    color={interest.color}
                    emissive={interest.color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.4}
                  />
                </Torus>
              ))}

              {/* Floating Icon */}
              <Float speed={3} rotationIntensity={0.2} floatIntensity={0.3}>
                <Text position={[0, 0, 0]} fontSize={1.2} color="#ffffff" anchorX="center" anchorY="middle">
                  {interest.icon}
                </Text>
              </Float>

              {/* Satellite Moons */}
              {Array.from({ length: 3 }).map((_, i) => {
                const moonAngle = (i / 3) * Math.PI * 2
                const moonRadius = 2.5
                return (
                  <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.2} floatIntensity={0.2}>
                    <Sphere
                      args={[0.1]}
                      position={[
                        Math.cos(moonAngle) * moonRadius,
                        Math.sin(moonAngle) * moonRadius,
                        Math.sin(moonAngle) * 0.5,
                      ]}
                    >
                      <meshStandardMaterial color={interest.color} emissive={interest.color} emissiveIntensity={0.8} />
                    </Sphere>
                  </Float>
                )
              })}

              {/* Planet Glow */}
              <pointLight position={[0, 0, 0]} intensity={2} color={interest.color} distance={12} />
            </group>
          </Float>
        ))}
      </group>

      {/* Asteroid Field */}
      <group ref={asteroidsRef}>
        {Array.from({ length: 150 }).map((_, i) => {
          const size = 0.1 + Math.random() * 0.4
          return (
            <Float key={i} speed={0.2 + Math.random() * 0.3} rotationIntensity={0.5} floatIntensity={0.3}>
              <Sphere
                args={[size]}
                position={[(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30]}
              >
                <meshStandardMaterial
                  color="#666666"
                  roughness={0.8}
                  metalness={0.2}
                  emissive="#333333"
                  emissiveIntensity={0.1}
                />
              </Sphere>
            </Float>
          )
        })}
      </group>

      {/* Cosmic Dust and Nebula */}
      {Array.from({ length: 300 }).map((_, i) => (
        <Float key={i} speed={0.1 + Math.random() * 0.2} rotationIntensity={0.1} floatIntensity={0.1}>
          <Sphere
            args={[0.01]}
            position={[(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40]}
          >
            <meshStandardMaterial
              color={interests[Math.floor(Math.random() * interests.length)].color}
              emissive={interests[Math.floor(Math.random() * interests.length)].color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}

      {/* Nebula Clouds */}
      {Array.from({ length: 25 }).map((_, i) => (
        <Float key={i} speed={0.05} rotationIntensity={0.02} floatIntensity={0.05}>
          <Sphere
            args={[3 + Math.random() * 4]}
            position={[(Math.random() - 0.5) * 70, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 35]}
          >
            <meshStandardMaterial
              color={interests[Math.floor(Math.random() * interests.length)].color}
              emissive={interests[Math.floor(Math.random() * interests.length)].color}
              emissiveIntensity={0.1}
              transparent
              opacity={0.1}
            />
          </Sphere>
        </Float>
      ))}

      {/* Scene Lighting */}
      <ambientLight intensity={0.2} color="#001122" />
      <pointLight position={[0, 0, 0]} intensity={3} color="#00ffff" distance={40} />
      {interests.map((interest, i) => (
        <pointLight key={i} position={interest.position} intensity={1.5} color={interest.color} distance={15} />
      ))}
    </group>
  )
}
