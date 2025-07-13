"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text, RoundedBox, Float, Sphere, Box } from "@react-three/drei"
import type * as THREE from "three"

interface EducationSceneProps {
  visible: boolean
  progress: number
}

const education = [
  {
    degree: "B.E. in Computer Science",
    institution: "Priyadarshini Engineering College, Vellore",
    year: "2024",
    grade: "CGPA: 8.10",
    position: [-9, 0, 0] as [number, number, number],
    color: "#4ecdc4",
    description: "Comprehensive computer science education with focus on software engineering and data structures.",
  },
  {
    level: "Higher Secondary Certificate (HSC)",
    institution: "Selva Higher Secondary School",
    year: "2020",
    grade: "64.5%",
    position: [0, -3, 0] as [number, number, number],
    color: "#ff6b6b",
    description: "Science stream with mathematics, physics, and chemistry specialization.",
  },
  {
    level: "Secondary School Leaving Certificate (SSLC)",
    institution: "Crecent Matriculation School",
    year: "2018",
    grade: "79.4%",
    position: [9, -6, 0] as [number, number, number],
    color: "#a8e6cf",
    description: "Strong foundation in core subjects with excellent academic performance.",
  },
]

const certifications = [
  { name: "Full Stack Development with Python", provider: "Tech Institute", date: "Dec 2023", color: "#61DAFB" },
  { name: "Cloud Essentials with AWS", provider: "Amazon Web Services", date: "Dec 2022", color: "#FF9900" },
  { name: "Data Analysis & Visualization", provider: "Analytics Pro", date: "Jun 2023", color: "#4ecdc4" },
  { name: "Cloud Sandboxing & Cybersecurity", provider: "Security Labs", date: "Sep 2022", color: "#ff6b6b" },
  { name: "Advanced React Development", provider: "React Academy", date: "Nov 2023", color: "#96ceb4" },
  { name: "Machine Learning Fundamentals", provider: "AI Institute", date: "Aug 2022", color: "#ffd93d" },
]

export default function EducationScene({ visible, progress }: EducationSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timelineRef = useRef<THREE.Group>(null)
  const certificatesRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Timeline movement
    if (timelineRef.current) {
      timelineRef.current.rotation.y = Math.sin(time * 0.1) * 0.1
    }

    // Certificates orbital motion
    if (certificatesRef.current) {
      certificatesRef.current.rotation.z = 0 //time * 0.1
    }

    // Main group floating
    if (groupRef.current) {
      groupRef.current.position.y = 8 + Math.sin(time * 0.2) * 0
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={[-1, 0, 25]}>
      {/* Scene Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 5, 0]}
          fontSize={2.2}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.otf"
          letterSpacing={0.1}
        >
          EDUCATION TIMELINE
        </Text>
      </Float>

      {/* Subtitle */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, 3.5 , 0]}
          fontSize={0.5}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.otf"
        >
          Academic Journey & Professional Development
        </Text>
      </Float>

      {/* Education Timeline */}
      <group ref={timelineRef} position={[0, 0, 0]}>
        {/* Timeline Base */}
        <Box args={[15, 0.1, 0.1]} position={[0, 10, 0]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
        </Box>

        {/* Education Nodes */}
        {education.map((edu, index) => (
          <Float key={edu.year} speed={1 + index * 0.2} rotationIntensity={0.1} floatIntensity={0.2}>
            <group position={edu.position}>
              {/* Holographic Display */}
              <RoundedBox args={[4, 3, 0.3]} radius={0.15}>
                <meshStandardMaterial
                  color="#1a1a1a"
                  emissive="#002244"
                  emissiveIntensity={0.3}
                  metalness={0.8}
                  roughness={0.2}
                />
              </RoundedBox>

              {/* Screen */}
              <RoundedBox args={[3.8, 2.8, 0.2]} position={[0, 0, 0.2]} radius={0.1}>
                <meshStandardMaterial
                  color="#000033"
                  emissive={edu.color}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.9}
                />
              </RoundedBox>

              {/* Education Content */}
              <Html
                position={[0, 0, 0.4]}
                transform
                occlude
                style={{
                  width: "320px",
                  height: "240px",
                  padding: "20px",
                  background: "rgba(0, 20, 40, 0.95)",
                  backdropFilter: "blur(15px)",
                  border: `2px solid ${edu.color}`,
                  borderRadius: "12px",
                  color: "white",
                  fontFamily: "'Geist', monospace",
                  fontSize: "12px",
                  boxShadow: `0 8px 32px ${edu.color}30`,
                }}
              >
                <div className="h-full flex flex-col justify-center space-y-3">
                  {/* Year Badge */}
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: edu.color }}>
                      {edu.year}
                    </div>
                    <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: edu.color }}></div>
                  </div>

                  {/* Education Details */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-white leading-tight">{edu.degree || edu.level}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">{edu.institution}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{edu.description}</p>

                    {/* Grade Badge */}
                    <div
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${edu.color}20`,
                        border: `1px solid ${edu.color}`,
                        color: edu.color,
                      }}
                    >
                      {edu.grade}
                    </div>
                  </div>
                </div>
              </Html>

              {/* Timeline Marker */}
              <Sphere args={[0.15]} position={[0, -2, 0]}>
                <meshStandardMaterial color={edu.color} emissive={edu.color} emissiveIntensity={0.8} />
              </Sphere>

              {/* Connection Line */}
              <Box args={[0.05, 1.5, 0.05]} position={[0, -1, 0]}>
                <meshStandardMaterial color={edu.color} emissive={edu.color} emissiveIntensity={0.5} />
              </Box>

              {/* Holographic Corners */}
              {[
                [-1.8, 1.3],
                [1.8, 1.3],
                [-1.8, -1.3],
                [1.8, -1.3],
              ].map((pos, i) => (
                <Sphere key={i} args={[0.05]} position={[pos[0], pos[1], 0.5]}>
                  <meshStandardMaterial color={edu.color} emissive={edu.color} emissiveIntensity={1} />
                </Sphere>
              ))}
            </group>
          </Float>
        ))}
      </group>

      {/* Certifications Orbital Display */}
      <group ref={certificatesRef} position={[2, -2, 25]}>
        <Float speed={0.2} rotationIntensity={0} floatIntensity={0.01}>
          <Text
            position={[0, 5, 0]}
            fontSize={1}
            color="#ffd93d"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Bold.otf"
          >
            CERTIFICATIONS
          </Text>
        </Float>

        {/* Certificate Badges */}
        {certifications.map((cert, index) => {
          const angle = (index / certifications.length) * Math.PI * 2
          const radius = 4
          return (
            <Float key={cert.name} speed={0.8 + index * 0.1} rotationIntensity={0} floatIntensity={0}>
              <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.8, Math.sin(angle) * 0.2]}>
                {/* Certificate Badge */}
                <RoundedBox args={[2.5, 1.5, 0.1]} radius={0.1}>
                  <meshStandardMaterial
                    color="#1a1a1a"
                    emissive={cert.color}
                    emissiveIntensity={0.2}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </RoundedBox>

                {/* Certificate Content */}
                <Html
                  position={[0, 0, 0.1]}
                  transform
                  occlude
                  style={{
                    width: "200px",
                    height: "120px",
                    padding: "15px",
                    background: "rgba(0, 20, 40, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${cert.color}40`,
                    borderRadius: "8px",
                    color: "white",
                    fontFamily: "'Geist', monospace",
                    fontSize: "10px",
                    textAlign: "center",
                  }}
                >
                  <div className="h-full flex flex-col justify-center space-y-2">
                    <div className="font-bold text-xs leading-tight" style={{ color: cert.color }}>
                      {cert.name}
                    </div>
                    <div className="text-xs text-gray-300">{cert.provider}</div>
                    <div className="text-xs text-gray-400">{cert.date}</div>
                  </div>
                </Html>

                {/* Certificate Glow */}
                <pointLight position={[0, 0, 0.5]} intensity={0.4} color={cert.color} distance={4} />
              </group>
            </Float>
          )
        })}
      </group>

      {/* Academic Environment */}
      <group position={[0, -7, -5]}>
        {/* Lecture Hall Seats */}
        {Array.from({ length: 8 }).map((_, i) => (
          <RoundedBox key={i} args={[3, 1, 1.5]} position={[-12 + i * 3, 0, 2]} radius={0.1}>
            <meshStandardMaterial color="#8B4513" roughness={0.8} />
          </RoundedBox>
        ))}

        {/* Podium */}
        <RoundedBox args={[2, 1.5, 1]} position={[0, 0.75, -3]} radius={0.1}>
          <meshStandardMaterial color="#654321" />
        </RoundedBox>
      </group>

      {/* Academic Particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={0.3 + Math.random() * 0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere
            args={[0.02]}
            position={[(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10]}
          >
            <meshStandardMaterial
              color={certifications[Math.floor(Math.random() * certifications.length)].color}
              emissive={certifications[Math.floor(Math.random() * certifications.length)].color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      ))}

      {/* Scene Lighting */}
      <ambientLight intensity={0.4} color="#004466" />
      <pointLight position={[0, 10, 5]} intensity={2} color="#ffffff" distance={30} />
      <spotLight
        position={[0, 15, 0]}
        intensity={1.5}
        color="#00aaff"
        angle={Math.PI / 4}
        penumbra={0.5}
        distance={25}
      />
    </group>
  )
}
