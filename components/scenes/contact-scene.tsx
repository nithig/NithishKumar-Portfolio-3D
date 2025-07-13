"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text, RoundedBox, Float, Sphere, Box, Torus } from "@react-three/drei"
import type * as THREE from "three"

interface ContactSceneProps {
  visible: boolean
  progress: number
}

const contactLinks = [
  {
    name: "Email",
    value: "gnithishdeveloper@gmail.com",
    icon: "✉️",
    color: "#ff6b6b",
    url: "mailto:gnithishdeveloper@gmail.com",
  },
  {
    name: "Portfolio",
    value: "nithishdeveloper.wuaze.com",
    icon: "🌐",
    color: "#4ecdc4",
    url: "https://www.nithishdeveloper.wuaze.com/",
  },
  {
    name: "Mobile",
    value: "+91 6383682418",
    icon: "📱",
    color: "#45b7d1",
    url: "tel:+916383682418",
  },
  {
    name: "GitHub",
    value: "github.com/nithish",
    icon: "⚡",
    color: "#a8e6cf",
    url: "https://github.com",
  },
  {
    name: "LinkedIn",
    value: "linkedin.com/in/nithish",
    icon: "💼",
    color: "#ffd93d",
    url: "https://linkedin.com",
  },
  {
    name: "LeetCode",
    value: "leetcode.com/nithish",
    icon: "🧩",
    color: "#ff8b94",
    url: "https://leetcode.com",
  },
]

export default function ContactScene({ visible, progress }: ContactSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const stationRef = useRef<THREE.Group>(null)
  const satelliteRef = useRef<THREE.Group>(null)
  const orbitingRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Station floating motion
    if (groupRef.current) {
      groupRef.current.position.y = 10 + Math.sin(time * 0.3) * 0.3
    }

    // Station rotation
    if (stationRef.current) {
      stationRef.current.rotation.y = time * 0
    }

    // Satellite dish rotation
    if (satelliteRef.current) {
      satelliteRef.current.rotation.y = time * 0.3
    }

    // Orbiting contacts
    if (orbitingRef.current) {
      orbitingRef.current.rotation.y = time * 0.2
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={[0, 10, 65]}>
      {/* Scene Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 15, 0]}
          fontSize={3}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.otf"
          letterSpacing={0.1}
        >
          CONTACT STATION
        </Text>
      </Float>

      {/* Subtitle */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, 13, 0]}
          fontSize={0.8}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.otf"
        >
          Deep Space Communication Hub
        </Text>
      </Float>

      {/* Main Space Station */}
      <group ref={stationRef}>
        {/* Central Command Module */}
        <RoundedBox args={[16, 10, 1]} position={[0, 0, 0]} radius={0.3}>
          <meshStandardMaterial
            color="#0a0a0a"
            emissive="#001122"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Main Display Screen */}
        <RoundedBox args={[15, 9, 0.3]} position={[0, 0, 0.7]} radius={0.2}>
          <meshStandardMaterial color="#000033" emissive="#002244" emissiveIntensity={0.6} transparent opacity={0.95} />
        </RoundedBox>

        {/* Terminal Interface */}
        <Html
          position={[0, 0, 1]}
          transform
          occlude
          style={{
            width: "1000px",
            height: "auto",
            padding: "40px",
            background: "rgba(0, 10, 30, 0.98)",
            backdropFilter: "blur(25px)",
            border: "3px solid rgba(0, 255, 255, 0.7)",
            borderRadius: "20px",
            color: "#00ff00",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "18px",
            boxShadow: "0 0 60px rgba(0, 255, 255, 0.4)",
            pointerEvents: "auto",
          }}
        >
          <div className="h-full flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-cyan-400/40">
              <div className="flex items-center space-x-4">
                <div className="w-5 h-5 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-cyan-400 font-bold text-xl">NITHISH@DEEP_SPACE_STATION:~$</div>
            </div>

            {/* Command Sequence */}
            <div className="space-y-4 mb-8">
              <div className="text-cyan-400">
                <span className="text-green-400">nithish@contact_station:~$ </span>
                <span className="text-white">initialize_communication_protocols</span>
              </div>
              <div className="text-cyan-300 text-xl font-bold animate-pulse">
                {"> ESTABLISHING QUANTUM ENTANGLEMENT..."}
              </div>
              <div className="text-green-400 text-lg">{"> COMMUNICATION CHANNELS ONLINE ✓"}</div>
              <div className="text-yellow-400">{"> AWAITING TRANSMISSION..."}</div>
            </div>

            {/* Contact Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                {contactLinks.map((contact, index) => (
                  <div
                    key={contact.name}
                    className="group p-6 rounded-xl border-2 border-cyan-400/30 hover:border-cyan-400/80 hover:bg-cyan-500/10 cursor-pointer transition-all duration-300 animate-fade-in-up"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(contact.url, "_blank");
                    }}
                    style={{
                      animationDelay: `${index * 0.2}s`,
                      background: `linear-gradient(135deg, rgba(0,20,40,0.8), rgba(0,30,60,0.6))`,
                      pointerEvents: "auto", 
                    }}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="text-5xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors text-lg">
                          {contact.name}
                        </div>
                        <div className="text-green-300 group-hover:text-green-200 transition-colors">
                          {contact.value}
                        </div>
                      </div>
                      <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                        →
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Panel */}
              <div className="mt-10 pt-8 border-t border-cyan-500/40 space-y-3">
                <div className="grid grid-cols-2 gap-6 text-lg">
                  <div className="text-cyan-400">{"> SYSTEM STATUS: FULLY_OPERATIONAL"}</div>
                  <div className="text-green-300">{"> AVAILABILITY: READY_FOR_COLLABORATION"}</div>
                  <div className="text-yellow-300">{"> LOCATION: BANGALORE, KARNATAKA"}</div>
                  <div className="text-purple-300">{"> MISSION: BUILDING_THE_FUTURE"}</div>
                </div>
              </div>
            </div>

            {/* Command Prompt */}
            <div className="mt-8 pt-6 border-t border-cyan-400/30">
              <div className="text-cyan-400 text-lg">
                <span className="text-green-400">nithish@contact_station:~$ </span>
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </Html>

        {/* Station Wings */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 12, 0, 0]}>
            <Box args={[8, 2, 0.5]}>
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </Box>
            {/* Solar Panels */}
            <Box args={[6, 12, 0.1]} position={[0, 0, 1]}>
              <meshStandardMaterial
                color="#001144"
                emissive="#002288"
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </Box>
          </group>
        ))}
      </group>

      {/* Orbiting Contact Satellites */}
      <group ref={orbitingRef}>
        {contactLinks.map((contact, index) => {
          const angle = (index / contactLinks.length) * Math.PI * 2
          const radius = 15
          return (
            <Float key={contact.name} speed={1 + index * 0.1} rotationIntensity={0.2} floatIntensity={0.3}>
              <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.5, Math.sin(angle) * 3]}>
                {/* Satellite Body */}
                <RoundedBox args={[1, 1, 2]} radius={0.1}>
                  <meshStandardMaterial
                    color={contact.color}
                    emissive={contact.color}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </RoundedBox>

                {/* Satellite Dish */}
                <mesh position={[0, 0, 1.5]} rotation={[Math.PI / 4, 0, 0]}>
                  <cylinderGeometry args={[0.8, 1, 0.2, 16]} />
                  <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Contact Label */}
                <Text
                  position={[0, -1.5, 0]}
                  fontSize={0.3}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  font="/fonts/Geist-Regular.otf"
                >
                  {contact.name}
                </Text>

                {/* Orbital Trail */}
                <Torus args={[radius, 0.02]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                  <meshStandardMaterial
                    color={contact.color}
                    emissive={contact.color}
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.4}
                  />
                </Torus>

                {/* Satellite Glow */}
                <pointLight position={[0, 0, 0]} intensity={1} color={contact.color} distance={8} />
              </group>
            </Float>
          )
        })}
      </group>

      {/* Communication Arrays */}
      <group ref={satelliteRef} position={[0, -8, 0]}>
        {/* Main Dish */}
        <mesh rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[5, 6, 0.5, 32]} />
          <meshStandardMaterial
            color="#2a2a2a"
            emissive="#001122"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Support Structure */}
        <Box args={[0.5, 6, 0.5]} position={[0, -3, 0]}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </Box>

        {/* Base Platform */}
        <RoundedBox args={[8, 1, 8]} position={[0, -6.5, 0]} radius={0.2}>
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
        </RoundedBox>

        {/* Receiver Array */}
        <Sphere args={[0.3]} position={[0, 2, 2]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.9} />
        </Sphere>
      </group>

      {/* Communication Beams */}
      {contactLinks.map((contact, index) => {
        const angle = (index / contactLinks.length) * Math.PI * 2
        return (
          <Float key={index} speed={0.8} rotationIntensity={0.1} floatIntensity={0.1}>
            <Box
              args={[0.1, 0.1, 25]}
              position={[Math.cos(angle) * 3, 0, Math.sin(angle) * 3]}
              rotation={[0, angle, 0]}
            >
              <meshStandardMaterial
                color={contact.color}
                emissive={contact.color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.6}
              />
            </Box>
          </Float>
        )
      })}

      {/* Deep Space Particles */}
      {Array.from({ length: 100 }).map((_, i) => (
        <Float key={i} speed={0.1 + Math.random() * 0.3} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere
            args={[0.03]}
            position={[(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20]}
          >
            <meshStandardMaterial
              color={contactLinks[Math.floor(Math.random() * contactLinks.length)].color}
              emissive={contactLinks[Math.floor(Math.random() * contactLinks.length)].color}
              emissiveIntensity={0.9}
              transparent
              opacity={0.8}
            />
          </Sphere>
        </Float>
      ))}

      {/* Scene Lighting */}
      <pointLight position={[0, 5, 5]} intensity={3} color="#00ffff" distance={40} />
      <ambientLight intensity={0.3} color="#002244" />
      <spotLight
        position={[0, 20, 10]}
        intensity={2}
        color="#ffffff"
        angle={Math.PI / 3}
        penumbra={0.5}
        distance={50}
      />
    </group>
  )
}
