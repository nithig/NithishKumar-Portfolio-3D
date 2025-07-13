"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, RoundedBox, Float, Sphere, Torus } from "@react-three/drei"
import type * as THREE from "three"

interface SkillsSceneProps {
  visible: boolean
  progress: number
}

const skillCategories = {
  languages: [
    { name: "Python", color: "#3776AB", position: [-4, 3, 0] as [number, number, number] },
    { name: "JavaScript", color: "#F7DF1E", position: [4, 3, 0] as [number, number, number] },
    { name: "TypeScript", color: "#3178C6", position: [0, 4, -2] as [number, number, number] },
    { name: "C++", color: "#00599C", position: [-2, 3, 2] as [number, number, number] },
  ],
  frontend: [
    { name: "React.js", color: "#61DAFB", position: [-3, 1, 3] as [number, number, number] },
    { name: "HTML5", color: "#E34F26", position: [3, 1, 3] as [number, number, number] },
    { name: "CSS3", color: "#1572B6", position: [-4, 0, 1] as [number, number, number] },
    { name: "Next.js", color: "#000000", position: [4, 0, 1] as [number, number, number] },
  ],
  backend: [
    { name: "Node.js", color: "#339933", position: [-2, -1, 4] as [number, number, number] },
    { name: "Flask", color: "#000000", position: [2, -1, 4] as [number, number, number] },
    { name: "Express", color: "#000000", position: [0, -2, 2] as [number, number, number] },
  ],
  database: [
    { name: "MongoDB", color: "#47A248", position: [-3, -3, 0] as [number, number, number] },
    { name: "MySQL", color: "#4479A1", position: [3, -3, 0] as [number, number, number] },
  ],
  tools: [
    { name: "Git", color: "#F05032", position: [0, 2, -4] as [number, number, number] },
    { name: "Docker", color: "#2496ED", position: [-2, -2, -2] as [number, number, number] },
    { name: "AWS", color: "#FF9900", position: [2, -2, -2] as [number, number, number] },
  ],
}

const allSkills = [
  ...skillCategories.languages,
  ...skillCategories.frontend,
  ...skillCategories.backend,
  ...skillCategories.database,
  ...skillCategories.tools,
]

export default function SkillsScene({ visible, progress }: SkillsSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const neuralNetRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!visible) return

    const time = state.clock.elapsedTime

    // Neural network rotation
    if (neuralNetRef.current) {
      neuralNetRef.current.rotation.y = time * 0.15
      neuralNetRef.current.rotation.x = Math.sin(time * 0.4) * 0.1
    }

    // Pulsing central core
    if (coreRef.current) {
      const scale = 1 + Math.sin(time * 2.5) * 0.2
      coreRef.current.scale.setScalar(scale)
    }

    // Main group movement
    if (groupRef.current) {
      groupRef.current.position.y = -5 + Math.sin(time * 0.3) * 0.3
    }
  })

  if (!visible) return null

  return (
    <group ref={groupRef} position={[-4, 5, 20]}>
      {/* Scene Title */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Text
          position={[0, 16, -5]}
          fontSize={2.5}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.otf"
          letterSpacing={0.1}
        >
          NEURAL SKILLS NETWORK
        </Text>
      </Float>

      {/* Subtitle */}
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[4, 14, -2]}
          fontSize={0.6}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Regular.otf"
        >
          Interconnected Technology Matrix
        </Text>
      </Float>

      {/* Neural Network */}
      <group ref={neuralNetRef} position={[8, 8.5, 0]}>
        {/* Central Processing Core */}
        <Sphere ref={coreRef} args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00aaaa"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>

        {/* Core Rings */}
        {[1.5, 2, 2.5].map((radius, i) => (
          <Torus key={i} args={[radius, 0.03]} rotation={[Math.PI / 2 + i * 0.3, 0, 0]}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              emissiveIntensity={0.4}
              transparent
              opacity={0.6}
            />
          </Torus>
        ))}

        {/* Skill Nodes */}
        {allSkills.map((skill, index) => (
          <Float key={skill.name} speed={1 + index * 0.1} rotationIntensity={0.2} floatIntensity={0.3}>
            <group position={skill.position}>
              {/* Skill Orb */}
              <Sphere args={[0.4]}>
                <meshStandardMaterial
                  color={skill.color}
                  emissive={skill.color}
                  emissiveIntensity={0.5}
                  roughness={0.3}
                  metalness={0.7}
                />
              </Sphere>

              {/* Skill Label */}
              <Text
                position={[0, -0.8, 0]}
                fontSize={0.25}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                font="/fonts/Geist-Regular.otf"
              >
                {skill.name}
              </Text>

              {/* Neural Connection to Core */}
              <mesh lookAt={[0, 0, 0]}>
                <cylinderGeometry
                  args={[
                    0.01,
                    0.01,
                    Math.sqrt(skill.position[0] ** 2 + skill.position[1] ** 2 + skill.position[2] ** 2) / 2,
                  ]}
                />
                <meshStandardMaterial
                  color="#00ffff"
                  emissive="#00ffff"
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.5}
                />
              </mesh>

              {/* Category Indicator Ring */}
              <Torus args={[0.6, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                  color={
                    skillCategories.languages.includes(skill)
                      ? "#ff6b6b"
                      : skillCategories.frontend.includes(skill)
                        ? "#4ecdc4"
                        : skillCategories.backend.includes(skill)
                          ? "#45b7d1"
                          : skillCategories.database.includes(skill)
                            ? "#96ceb4"
                            : "#ffd93d"
                  }
                  emissive={
                    skillCategories.languages.includes(skill)
                      ? "#ff6b6b"
                      : skillCategories.frontend.includes(skill)
                        ? "#4ecdc4"
                        : skillCategories.backend.includes(skill)
                          ? "#45b7d1"
                          : skillCategories.database.includes(skill)
                            ? "#96ceb4"
                            : "#ffd93d"
                  }
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.7}
                />
              </Torus>
            </group>
          </Float>
        ))}
      </group>

      {/* Category Labels */}
      {[
        { name: "LANGUAGES", position: [1, 8, 0], color: "#ff6b6b" },
        { name: "FRONTEND", position: [13, 5, 0], color: "#4ecdc4" },
        { name: "BACKEND", position: [3, 12, -2], color: "#45b7d1" },
        { name: "DATABASE", position: [5, 2, 0], color: "#96ceb4" },
        { name: "TOOLS", position: [12, 12, -6], color: "#ffd93d" },
      ].map((category) => (
        <Float key={category.name} speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={category.position}
            fontSize={0.4}
            color={category.color}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Bold.otf"
          >
            {category.name}
          </Text>
        </Float>
      ))}

      {/* Server Infrastructure */}
      <group position={[2, 2, -8]}>
        {Array.from({ length: 5 }).map((_, i) => (
          <group key={i} position={[(-2 + i) * 3, 0, 0]}>
            <RoundedBox args={[2, 4, 1]} radius={0.1}>
              <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
            </RoundedBox>

            {/* Server Status Lights */}
            {Array.from({ length: 8 }).map((_, j) => (
              <Sphere key={j} args={[0.05]} position={[-0.6 + (j % 2) * 1.2, -1.5 + Math.floor(j / 2) * 0.5, 0.6]}>
                <meshStandardMaterial
                  color={j % 3 === 0 ? "#00ff00" : j % 3 === 1 ? "#ff0000" : "#0000ff"}
                  emissive={j % 3 === 0 ? "#00ff00" : j % 3 === 1 ? "#ff0000" : "#0000ff"}
                  emissiveIntensity={0.9}
                />
              </Sphere>
            ))}
          </group>
        ))}
      </group>

      {/* Neural Activity Particles */}
      {Array.from({ length: 80 }).map((_, i) => (
        <Float key={i} speed={0.2 + Math.random() * 0.4} rotationIntensity={0.1} floatIntensity={0.2}>
          <Sphere
            args={[0.02]}
            position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20]}
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
      <pointLight position={[0, 0, 0]} intensity={3} color="#00ffff" distance={25} />
      <ambientLight intensity={0.3} color="#004466" />
      <pointLight position={[10, 8, 8]} intensity={1.5} color="#ffffff" distance={30} />
      <pointLight position={[-10, -8, 8]} intensity={1} color="#ff6b6b" distance={25} />
    </group>
  )
}
