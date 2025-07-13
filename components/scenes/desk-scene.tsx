"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Float, Plane, RoundedBox, Sphere, Text } from "@react-three/drei"
import * as THREE from "three"

interface DeskSceneProps {
  visible: boolean
  currentSection: number
}

export default function DeskScene({ visible, currentSection }: DeskSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const monitorRef = useRef<THREE.Mesh>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const standRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!groupRef.current) return

    const time = state.clock.elapsedTime
    groupRef.current.position.y = Math.sin(time * 0.5) * 0.02

    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.1
    }
  })

  useEffect(() => {
    if (monitorRef.current) monitorRef.current.renderOrder = 2
    if (screenRef.current) screenRef.current.renderOrder = 3
    if (standRef.current) standRef.current.renderOrder = 1
  }, [])

  return (
    <group ref={groupRef} visible={currentSection <= 2}>
      {/* Desk */}
      <RoundedBox args={[8, 0.3, 4]} position={[0, -1.2, 0]} radius={0.05}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.1} />
      </RoundedBox>

      {/* Monitor Stand */}
      <RoundedBox ref={standRef} args={[0.4, 1.2, 0.4]} position={[0, -0.4, -1.4]} radius={0.02}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.2} />
      </RoundedBox>

      {/* Monitor Frame */}
      <RoundedBox ref={monitorRef} args={[4, 2.5, 0.15]} position={[0, 0.6, -1.2]} radius={0.05}>
        <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
      </RoundedBox>

      {/* Monitor Screen */}
      <Plane ref={screenRef} args={[3.6, 2.2]} position={[0, 0.6, -1.12]}>
        <meshStandardMaterial
          color="#000020"
          emissive="#001122"
          emissiveIntensity={0.3}
          transparent
          opacity={1}
          depthWrite={true}
          depthTest={true}
        />
      </Plane>

      {/* Keyboard Base */}
      <RoundedBox args={[2.5, 0.12, 1]} position={[0, -1.05, 0.8]} radius={0.02}>
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} />
      </RoundedBox>

      {/* Keyboard Keys */}
      {Array.from({ length: 60 }).map((_, i) => {
        const row = Math.floor(i / 12)
        const col = i % 12
        return (
          <Box key={i} args={[0.15, 0.05, 0.15]} position={[-1.1 + col * 0.2, -0.98, 0.3 + row * 0.2]}>
            <meshStandardMaterial color="#2a2a2a" />
          </Box>
        )
      })}

      {/* Mouse */}
      <RoundedBox args={[0.4, 0.08, 0.6]} position={[2, -1.05, 0.5]} radius={0.02}>
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} />
      </RoundedBox>

      {/* Chair */}
      <group position={[0, -0.3, 2.5]}>
        <RoundedBox args={[1.8, 0.15, 1.8]} position={[0, 0, 0]} radius={0.05}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
        <RoundedBox args={[1.8, 2, 0.15]} position={[0, 1, -0.8]} radius={0.05}>
          <meshStandardMaterial color="#1a1a1a" />
        </RoundedBox>
      </group>

      {/* Floating Name Text */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 4, -3]}
          fontSize={1.2}
          color="#00ff48"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.otf"
        >
          NITHISHKUMAR GANESAN
        </Text>
      </Float>

      {/* Subtitle */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, 3.2, -3]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.otf"
        >
          Full-Stack Developer | React, Python, MongoDB
        </Text>
      </Float>

      {/* Tagline */}
      <Float speed={1} rotationIntensity={0.03} floatIntensity={0.15}>
        <Text
          position={[0, 2.6, -3]}
          fontSize={0.25}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.otf"
          maxWidth={8}
          textAlign="center"
        >
          Bringing ideas to life with clean code and creative solutions
        </Text>
      </Float>

      {/* Ambient Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={0.5 + Math.random()} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere args={[0.01]} position={[(Math.random() - 0.5) * 15, Math.random() * 8, (Math.random() - 0.5) * 10]}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.5}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      ))}

      {/* Scene Lighting */}
      <pointLight position={[-3, 3, 2]} intensity={0.6} color="#00ffff" distance={12} />
      <pointLight position={[3, 3, 2]} intensity={0.4} color="#ff00ff" distance={10} />
    </group>
  )
}
