"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, RoundedBox, Float, Text, Sphere, Plane } from "@react-three/drei"
import type * as THREE from "three"

interface AboutSceneProps {
  visible: boolean
  progress: number
}

export default function AboutScene({ visible, progress }: AboutSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const hologramRef = useRef<THREE.Group>(null)
  const profileRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Main group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.5
    }

    // Hologram floating effect
    if (hologramRef.current) {
      hologramRef.current.position.y = Math.sin(time * 1) * 0.4
      hologramRef.current.rotation.y = time * 0
    }

    // Profile picture glow
    if (profileRef.current) {
      const material = profileRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.4 + Math.sin(time * 2) * 0.5
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={[0, 2, 5]}>
      {/* Holographic Display Frame */}
      {/* <RoundedBox args={[12, 8, 0.5]} position={[0, 0, 0]} radius={0.2}>
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#001122"
          emissiveIntensity={0.3}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.8}
        />
      </RoundedBox> */}

      {/* Holographic Screen */}
      {/* <Plane args={[11.5, 7.5]} position={[0, 0, 0.3]}>
        <meshStandardMaterial color="#000033" emissive="#002244" emissiveIntensity={0.4} transparent opacity={0.7} />
      </Plane> */}

      {/* Floating Hologram Content */}
      <group ref={hologramRef} position={[-2, 0, -5]}>
        {/* Profile Hologram */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <RoundedBox ref={profileRef} args={[2.5, 2.5, 0.1]} position={[-3.5, 1, 0]} radius={1.25}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00aaaa"
              emissiveIntensity={0.6}
              transparent
              opacity={0.8}
            />
          </RoundedBox>
        </Float>

        {/* Holographic Data Panels */}
        <Html
          position={[1.5, 0.5, 0]}
          transform
          occlude
          style={{
            width: "500px",
            height: "400px",
            padding: "30px",
            background: "rgba(0, 30, 60, 0.9)",
            backdropFilter: "blur(20px)",
            border: "2px solid rgba(0, 255, 255, 0.5)",
            borderRadius: "15px",
            color: "white",
            fontFamily: "'Geist', monospace",
            fontSize: "14px",
            boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)",
          }}
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-cyan-400/30 pb-4">
              <h2 className="text-3xl font-bold text-cyan-400 mb-2">PERSONAL DATA MATRIX</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded"></div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-mono text-sm">IDENTITY_CONFIRMED</span>
              </div>

              <p className="text-sm leading-relaxed text-gray-200">
                Hi, I'm <span className="text-cyan-400 font-bold">Nithishkumar Ganesan</span>, a passionate full-stack
                developer with expertise in modern web technologies. I specialize in creating scalable applications
                using React.js, Python, Flask, Node.js, and MongoDB.
              </p>

              <p className="text-sm leading-relaxed text-gray-200">
                I thrive on transforming complex problems into elegant solutions, constantly pushing the boundaries of
                what's possible with code. My mission is to build technology that enhances user experiences and drives
                innovation.
              </p>
            

            {/* Skills Matrix */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-cyan-300 flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
                CORE_TECHNOLOGIES
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {["React.js", "Python", "Flask", "Node.js", "MongoDB", "MySQL", "JavaScript", "TypeScript", "Git"].map(
                  (skill, index) => (
                    <div
                      key={skill}
                      className="px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-lg text-xs text-cyan-300 text-center font-medium animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      {skill}
                    </div>
                  ),
                )}
              </div>
            </div>
            </div>

            {/* Status */}
            <div className="pt-4 border-t border-cyan-400/20">
              <div className="flex justify-between items-center">
                <span className="text-cyan-400/80 text-xs font-mono">STATUS:</span>
                <span className="text-green-400 text-xs font-mono animate-pulse">READY_FOR_COLLABORATION</span>
              </div>
            </div>
          </div>
        </Html>

        {/* Floating Data Orbs */}
        {[
          { skill: "Frontend", color: "#61DAFB", position: [-2, 3, -1] },
          { skill: "Backend", color: "#339933", position: [2, 3, -1] },
          { skill: "Database", color: "#47A248", position: [-2, -2, -1] },
          { skill: "DevOps", color: "#FF9900", position: [2, -2, -1] },
        ].map((item, index) => (
          <Float key={item.skill} speed={1 + index * 0.2} rotationIntensity={0.2} floatIntensity={0.3}>
            <group position={item.position as [number, number, number]}>
              <Sphere args={[0.3]}>
                <meshStandardMaterial
                  color={item.color}
                  emissive={item.color}
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.8}
                />
              </Sphere>
              <Text
                position={[0, -0.6, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Geist-Regular.otf"
              >
                {item.skill}
              </Text>
            </group>
          </Float>
        ))}
      </group>

      {/* Holographic Grid Lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <mesh position={[-5 + i * 0.5, 0, 0.1]} rotation={[0, 0, Math.PI / 2]}>
            <planeGeometry args={[0.02, 8]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Ambient Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={i} speed={0.3 + Math.random() * 0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere
            args={[0.02]}
            position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 3]}
          >
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

      {/* Scene Lighting */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#00ffff" distance={20} />
      <pointLight position={[-5, 3, 1]} intensity={1} color="#ffffff" distance={15} />
      <pointLight position={[5, -3, 1]} intensity={0.8} color="#ff6b6b" distance={12} />
    </group>
  )
}
