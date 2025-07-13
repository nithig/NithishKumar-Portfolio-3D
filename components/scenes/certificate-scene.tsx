// app/components/CertificateDisplay.tsx
"use client"

import { useRef } from "react"
import { Float, Text, Html, RoundedBox, Sphere } from "@react-three/drei"
import type * as THREE from "three"

interface Certificate {
  name: string
  provider: string
  date: string
  color: string
}

interface Props {
  visible: boolean
  progress: number
}

const certificates = [
  { name: "Full Stack Development with Python", provider: "Tech Institute", date: "Dec 2023", color: "#61DAFB" },
  { name: "Cloud Essentials with AWS", provider: "Amazon Web Services", date: "Dec 2022", color: "#FF9900" },
  { name: "Data Analysis & Visualization", provider: "Analytics Pro", date: "Jun 2023", color: "#4ecdc4" },
  { name: "Cloud Sandboxing & Cybersecurity", provider: "Security Labs", date: "Sep 2022", color: "#ff6b6b" },
  { name: "Advanced React Development", provider: "React Academy", date: "Nov 2023", color: "#96ceb4" },
  { name: "Machine Learning Fundamentals", provider: "AI Institute", date: "Aug 2022", color: "#ffd93d" },
]

export default function CertificateScene({ visible }: Props) {
  const certificatesRef = useRef<THREE.Group>(null)

  return (
    <group ref={certificatesRef} position={[15, -5, 10]}>
      {/* Title */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          position={[0, 3, 0]}
          fontSize={1}
          color="#ffd93d"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.otf"
        >
          CERTIFICATIONS
        </Text>
      </Float>

      {/* Certificates Orbit */}
      {certificates.map((cert, index) => {
        const angle = (index / certificates.length) * Math.PI * 2
        const radius = 4
        return (
          <Float key={cert.name} speed={0.8 + index * 0.1} rotationIntensity={0.1} floatIntensity={0.15}>
            <group position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.4, Math.sin(angle) * 1]}>
              {/* Badge */}
              <RoundedBox args={[2.5, 1.5, 0.1]} radius={0.1}>
                <meshStandardMaterial
                  color="#1a1a1a"
                  emissive={cert.color}
                  emissiveIntensity={0.2}
                  metalness={0.8}
                  roughness={0.2}
                />
              </RoundedBox>

              {/* HTML Card */}
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

              {/* Glow */}
              <pointLight position={[0, 0, 0.5]} intensity={0.4} color={cert.color} distance={4} />
            </group>
          </Float>
        )
      })}
    </group>
  )
}
