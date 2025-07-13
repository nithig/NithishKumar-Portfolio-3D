"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, RoundedBox, Float, Sphere, Plane } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import type * as THREE from "three"

interface WorkspaceSceneProps {
  visible: boolean
  progress: number
}

export default function WorkspaceScene({ visible, progress }: WorkspaceSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const keyboardRef = useRef<THREE.Group>(null)
  const codeRef = useRef<THREE.Group>(null)

  // Holographic code lines
  const codeLines = useMemo(
    () => [
      "const developer = {",
      "  name: 'Nithishkumar Ganesan',",
      "  role: 'Full-Stack Developer',",
      "  skills: ['React', 'Python', 'MongoDB'],",
      "  passion: 'Building amazing experiences',",
      "  status: 'Ready to innovate'",
      "};",
    ],
    [],
  )

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Screen glow effect
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.4 + Math.sin(time * 3) * 0.1
    }

    // Keyboard breathing
    if (keyboardRef.current) {
      keyboardRef.current.scale.y = 1 + Math.sin(time * 2) * 0.02
    }

    // Floating code animation
    if (codeRef.current) {
      codeRef.current.position.y = Math.sin(time * 0.8) * 0.1
      codeRef.current.rotation.y = Math.sin(time * 0.3) * 0.05
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef}>
      {/* Futuristic Desk */}
      <RoundedBox args={[12, 0.4, 6]} position={[0, -1.5, 0]} radius={0.1}>
        <meshStandardMaterial
          color="#1a1a2e"
          emissive="#0f0f1a"
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={0.8}
        />
      </RoundedBox>

      {/* Holographic Monitor Setup */}
      <group position={[0, 0, -2]}>
        {/* Monitor Stand */}
        <RoundedBox args={[0.6, 2, 0.6]} position={[0, -0.5, -1]} radius={0.05}>
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <RoundedBox args={[2, 0.1, 1]} position={[0, -1.3, -0.2]} radius={0.05}>
          <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.3} emissive="#000822"
            emissiveIntensity={0.2} />
        </RoundedBox>



        {/* Main Monitor */}
        <RoundedBox args={[8, 5, 0.2]} position={[0, 1.5, 0]} radius={0.2}>
          <meshStandardMaterial
            color="#000000"
            emissive="#001122"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Screen */}
        <Plane ref={screenRef} args={[7.5, 4.5]} position={[0, 1.5, 0.15]}>
          <meshStandardMaterial color="#000033" emissive="#002244" emissiveIntensity={0.4} transparent opacity={0.9} />
        </Plane>

        {/* Floating Code Display */}
        <group ref={codeRef} position={[0, 1.5, 0.5]}>
          {codeLines.map((line, index) => (
            <Float key={index} speed={0.5 + index * 0.1} rotationIntensity={0.02} floatIntensity={0.05}>
              <Text
                position={[-3, 2.5 - index * 0.4, 0]}
                fontSize={0.25}
                color="#00ff00"
                anchorX="left"
                anchorY="middle"
                font="/fonts/GeistMono-Regular.ttf"

              >
                {line}
              </Text>
            </Float>
          ))}
        </group>
      </group>

      {/* Advanced Keyboard */}
      <group ref={keyboardRef} position={[0, -1.2, 1.5]}>
        <RoundedBox args={[4, 0.2, 1.5]} radius={0.05}>
          <meshStandardMaterial
            color="#1a1a1a"
            emissive="#001122"
            emissiveIntensity={0.2}
            roughness={0.3}
            metalness={0.7}
          />
        </RoundedBox>

        {/* Glowing Keys */}
        {Array.from({ length: 84 }).map((_, i) => {
          const row = Math.floor(i / 14)
          const col = i % 14
          const isSpecial = i % 7 === 0

          return (
            <Float key={i} speed={2 + Math.random()} rotationIntensity={0.1} floatIntensity={0.02}>
              <RoundedBox args={[0.2, 0.08, 0.2]} position={[-1.6 + col * 0.26, 0.19, -0.5 + row * 0.26]} radius={0.02}>
                <meshStandardMaterial
                  color={isSpecial ? "#00ffff" : "#2a2a2a"}
                  emissive={isSpecial ? "#00aaaa" : "#111111"}
                  emissiveIntensity={isSpecial ? 0.5 : 0.1}
                />
              </RoundedBox>
            </Float>
          )
        })}
      </group>

      {/* Holographic Mouse */}
      <group position={[3, -1.2, 1]}>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
          {/* Main Mouse Body */}
          <RoundedBox args={[1, 0.2, 1]} radius={0.2}>
            <meshStandardMaterial
              color="#2a2a2a"
              emissive="#004444"
              emissiveIntensity={0.4}
              metalness={0.5}
              roughness={0.3}
              transparent
              opacity={0.85}
            />
          </RoundedBox>

          {/* Left & Right Click Buttons */}
          {[-0.15, 0.15].map((x, i) => (
            <RoundedBox key={i} args={[0, 0.02, 0.4]} position={[x, 0.12, 0]} radius={0.03}>
              <meshStandardMaterial color="#333" emissive="#006666" emissiveIntensity={0.3} />
            </RoundedBox>
          ))}

          {/* Scroll Wheel */}
          <RoundedBox args={[0.05, 0.02, 0.15]} position={[0, 0.13, 0.15]} radius={0.02}>
            <meshStandardMaterial color="#666" emissive="#00aaaa" emissiveIntensity={0.4} />
          </RoundedBox>
        </Float>
      </group>

      {/* Floating UI Elements */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 6
        return (
          <Float key={i} speed={0.8 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.3}>
            <group position={[Math.cos(angle) * radius, 2 + Math.sin(angle) * 2, Math.sin(angle) * 3]}>
              <RoundedBox args={[0.8, 0.8, 0.05]} radius={0.1}>
                <meshStandardMaterial
                  color="#001122"
                  emissive="#002244"
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.7}
                />
              </RoundedBox>

              <Text
                position={[0, 0, 0.05]}
                fontSize={0.15}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Geist-Regular.otf"
                fontWeight="900"
              >
                {
                  [
                    "React",
                    "Python",
                    "Node.js",
                    "MongoDB",
                    "Flask",
                    "MySQL",
                    "Git",
                    "AWS",
                    "Docker",
                    "TypeScript",
                    "Next.js",
                    "Express",
                  ][i]
                }
              </Text>
            </group>
          </Float>
        )
      })}

      {/* Data Streams */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={0.3 + Math.random() * 0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere args={[0.02]} position={[(Math.random() - 0.5) * 20, Math.random() * 10, (Math.random() - 0.5) * 15]}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      ))}

      {/* Ambient Lighting */}
      <pointLight position={[0, 2, 2]} intensity={2} color="#00ffff" distance={15} />
      <pointLight position={[-5, 3, 0]} intensity={1} color="#ff6b6b" distance={12} />
      <pointLight position={[5, 3, 0]} intensity={1} color="#4ecdc4" distance={12} />

      {/* Rim lighting */}
      <spotLight
        position={[0, 8, -5]}
        intensity={1.5}
        color="#ffffff"
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={20}
      />
      {/* <axesHelper args={[5]} /> */}
    </group>
  )
}
