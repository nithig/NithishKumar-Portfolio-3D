"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Text, RoundedBox, Float, Sphere, Box } from "@react-three/drei"
import type * as THREE from "three"

interface ProjectsSceneProps {
  visible: boolean
  progress: number
}

const projects = [
  {
    title: "Future of Work - Glassdoor Analysis",
    description:
      "Comprehensive data analysis project examining job market trends, salary insights, and emerging roles using advanced Python analytics and machine learning techniques.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn", "NumPy", "Jupyter"],
    color: "#4ecdc4",
    position: [-6, 2, 0] as [number, number, number],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Lung Cancer Detection CNN",
    description:
      "Deep learning model for early-stage lung cancer detection from histopathological images, achieving 94% accuracy with advanced convolutional neural networks.",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "CNN", "Medical AI"],
    color: "#ff6b6b",
    position: [6, 2, 0] as [number, number, number],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Full-Stack E-Commerce Platform",
    description:
      "Modern e-commerce solution with React frontend, Node.js backend, real-time inventory management, secure payment integration, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Socket.io"],
    color: "#a8e6cf",
    position: [-3, -5, 3] as [number, number, number],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    title: "Real-Time Chat Application",
    description:
      "Scalable chat application with real-time messaging, file sharing, group chats, and end-to-end encryption using modern web technologies.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB", "JWT", "WebRTC"],
    color: "#ffd93d",
    position: [7, -5, 3] as [number, number, number],
    github: "https://github.com",
    demo: "https://demo.com",
  },
]

export default function ProjectsScene({ visible, progress }: ProjectsSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const matrixRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Matrix rotation
    if (matrixRef.current) {
      matrixRef.current.rotation.y = time * 0
      matrixRef.current.rotation.x = Math.sin(time * 0.3) * 0.05
    }

    // Main group gentle movement
    if (groupRef.current) {
      groupRef.current.position.y = 2 + Math.sin(time * 0.4) * 0.2
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={[-2, 2, -10]}>
      {/* Scene Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 8, 0]}
          fontSize={2}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.otf"
          letterSpacing={0.1}
        >
          PROJECTS MATRIX
        </Text>
      </Float>

      {/* Subtitle */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, 6.5, 0]}
          fontSize={0.6}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.otf"
        >
          Interactive Project Archive
        </Text>
      </Float>

      {/* Projects Matrix */}
      <group ref={matrixRef}>
        {projects.map((project, index) => (
          <Float key={project.title} speed={1 + index * 0.2} rotationIntensity={0.1} floatIntensity={0.2}>
            <group position={project.position}>
              {/* Holographic Project Frame */}
              <RoundedBox args={[4, 3.5, 0.2]} radius={0.1}>
                <meshStandardMaterial
                  color={project.color}
                  emissive={project.color}
                  emissiveIntensity={0.2}
                  transparent
                  opacity={0.1}
                />
              </RoundedBox>

              {/* Inner Display */}
              <RoundedBox args={[3.8, 3.3, 0.15]} position={[0, 0, 0.1]} radius={0.08}>
                <meshStandardMaterial
                  color="#001122"
                  emissive="#002244"
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.9}
                />
              </RoundedBox>

              {/* Project Content */}
              <Html
                position={[0, 0, 0.3]}
                transform
                occlude
                style={{
                  width: "320px",
                  height: "280px",
                  padding: "20px",
                  background: "rgba(0, 20, 40, 0.95)",
                  backdropFilter: "blur(15px)",
                  border: `2px solid ${project.color}`,
                  borderRadius: "12px",
                  color: "white",
                  fontFamily: "'Geist', monospace",
                  fontSize: "12px",
                  boxShadow: `0 8px 32px ${project.color}30`,
                }}
              >
                <div className="h-full flex flex-col">
                  {/* Project Header */}
                  <div className="mb-3">
                    <h3 className="font-bold mb-2 text-sm leading-tight" style={{ color: project.color }}>
                      {project.title}
                    </h3>
                    <div className="w-12 h-0.5 rounded" style={{ backgroundColor: project.color }}></div>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed mb-4 flex-1 text-gray-200">{project.description}</p>

                  {/* Tech Stack */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs font-medium animate-fade-in"
                          style={{
                            backgroundColor: `${project.color}20`,
                            border: `1px solid ${project.color}40`,
                            color: project.color,
                            animationDelay: `${techIndex * 0.1}s`,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        className="flex-1 py-2 rounded font-medium text-xs transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: `${project.color}20`,
                          border: `1px solid ${project.color}`,
                          color: project.color,
                        }}
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        GitHub →
                      </button>
                      <button
                        className="flex-1 py-2 rounded font-medium text-xs transition-all duration-300 hover:scale-105"
                        style={{
                          backgroundColor: `${project.color}`,
                          color: "#000000",
                        }}
                        onClick={() => window.open(project.demo, "_blank")}
                      >
                        Live Demo
                      </button>
                    </div>
                  </div>
                </div>
              </Html>

              {/* Corner Glow Effects */}
              {[
                [-1.8, 1.6],
                [1.8, 1.6],
                [-1.8, -1.6],
                [1.8, -1.6],
              ].map((pos, i) => (
                <Sphere key={i} args={[0.05]} position={[pos[0], pos[1], 0.4]}>
                  <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={1} />
                </Sphere>
              ))}

              {/* Project Glow */}
              <pointLight position={[0, 0, 1]} intensity={0.8} color={project.color} distance={6} />
            </group>
          </Float>
        ))}
      </group>

      {/* Matrix Grid Background */}
      <group position={[0, 0, -5]}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Box key={i} args={[0.02, 20, 0.02]} position={[-7 + i, 0, 0]}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </Box>
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <Box key={i} args={[20, 0.02, 0.02]} position={[0, -7 + i, 0]}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.2}
              transparent
              opacity={0.3}
            />
          </Box>
        ))}
      </group>

      {/* Data Stream Particles */}
      {Array.from({ length: 60 }).map((_, i) => (
        <Float key={i} speed={0.3 + Math.random() * 0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere
            args={[0.02]}
            position={[(Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10]}
          >
            <meshStandardMaterial
              color={projects[Math.floor(Math.random() * projects.length)].color}
              emissive={projects[Math.floor(Math.random() * projects.length)].color}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </Sphere>
        </Float>
      ))}

      {/* Scene Lighting */}
      <ambientLight intensity={0.4} color="#004466" />
      <pointLight position={[0, 8, 5]} intensity={2} color="#00aaff" distance={30} />
      <spotLight
        position={[0, 12, 0]}
        intensity={1.5}
        color="#ffffff"
        angle={Math.PI / 3}
        penumbra={0.5}
        distance={25}
      />
    </group>
  )
}
