"use client"

interface HUDProps {
  currentSection: number
  progress: number
}

const sections = [
  "INITIALIZATION",
  "WORKSPACE_ENTRY",
  "WORKSPACE_ACTIVE",
  "HOLOGRAM_SCAN",
  "PROJECTS_MATRIX",
  "NEURAL_NETWORK",
  "TIMELINE_ACCESS",
  "GALAXY_EXPLORATION",
  "CONTACT_STATION",
]

const sectionData = [
  { name: "HERO", status: "ONLINE", color: "#00ffff" },
  { name: "WORKSPACE", status: "ACTIVE", color: "#00ff00" },
  { name: "WORKSPACE", status: "SCANNING", color: "#ffff00" },
  { name: "ABOUT", status: "ANALYZING", color: "#ff6b6b" },
  { name: "PROJECTS", status: "LOADING", color: "#4ecdc4" },
  { name: "SKILLS", status: "PROCESSING", color: "#a8e6cf" },
  { name: "EDUCATION", status: "ACCESSING", color: "#ffd93d" },
  { name: "INTERESTS", status: "EXPLORING", color: "#ff8b94" },
  { name: "CONTACT", status: "READY", color: "#96ceb4" },
]

export default function HUD({ currentSection, progress }: HUDProps) {
  const current = sectionData[currentSection] || sectionData[0]

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Top HUD Bar */}
     <div className="fixed top-32 left-72 right-0 z-50 p-6">
        <div className="flex justify-between items-start">
          {/* Left Panel */}
          <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-mono text-sm">SYSTEM ONLINE</span>
            </div>
            <div className="text-cyan-400 font-mono text-lg font-bold">NITHISHKUMAR.PORTFOLIO</div>
            <div className="text-cyan-300/60 text-xs font-mono">v2.0.24 | IMMERSIVE_MODE</div>
          </div>

          {/* Right Panel */}
          <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4">
            <div className="text-right">
              <div className="text-cyan-400 font-mono text-sm">CURRENT SECTION</div>
              <div className="text-white font-mono text-lg font-bold">{current.name}</div>
              <div className="flex items-center justify-end space-x-2 mt-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: current.color }}></div>
                <span className="text-xs font-mono" style={{ color: current.color }}>
                  {current.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="fixed bottom-[-50px] right-[550px] p-6">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-400 font-mono text-sm">MISSION PROGRESS</span>
            <span className="text-white font-mono text-sm">{Math.round(progress * 100)}%</span>
          </div>

          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-xs font-mono text-gray-400">
            <span>SECTION {currentSection + 1}/9</span>
            <span>{sections[currentSection] || "UNKNOWN"}</span>
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <div className="absolute left-[640px] top-0 transform -translate-y-1/2">
        <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg p-3">
          <div className="space-y-3">
            {sectionData.map((section, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  index === currentSection ? "scale-110" : "hover:scale-105"
                }`}
                title={section.name}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                    index === currentSection
                      ? `bg-[${section.color}] border-[${section.color}] shadow-lg`
                      : index < currentSection
                        ? `bg-[${section.color}]/50 border-[${section.color}]`
                        : "bg-transparent border-cyan-400/30 hover:border-cyan-400/60"
                  }`}
                  style={{
                    backgroundColor:
                      index === currentSection
                        ? section.color
                        : index < currentSection
                          ? `${section.color}80`
                          : "transparent",
                    borderColor: index <= currentSection ? section.color : "rgba(0, 255, 255, 0.3)",
                    boxShadow: index === currentSection ? `0 0 10px ${section.color}` : "none",
                  }}
                />

                {/* Section Label */}
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 rounded px-3 py-1 whitespace-nowrap">
                    <span className="text-cyan-400 text-sm font-mono">{section.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px bg-cyan-400/20"
            style={{
              top: `${20 + i * 30}%`,
              animation: `scanline 3s linear infinite ${i * 1}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
