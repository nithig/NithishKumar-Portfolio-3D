"use client"

interface ScrollIndicatorProps {
  currentSection: number
  progress: number
}

const sections = ["Intro", "Desk", "About", "Projects", "Skills", "Education", "Interests", "Contact"]

export default function ScrollIndicator({ currentSection, progress }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`relative group cursor-pointer transition-all duration-300 ${
              index === currentSection ? "scale-110" : "hover:scale-105"
            }`}
            title={section}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                index === currentSection
                  ? "bg-cyan-400 border-cyan-400 shadow-lg shadow-cyan-400/50"
                  : index < currentSection
                    ? "bg-cyan-600/50 border-cyan-600"
                    : "bg-transparent border-cyan-400/30 hover:border-cyan-400/60"
              }`}
            />

            {/* Progress Ring */}
            {index === currentSection && (
              <div className="absolute inset-0 w-4 h-4">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="6" fill="none" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1" />
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    fill="none"
                    stroke="#00ffff"
                    strokeWidth="1"
                    strokeDasharray={`${2 * Math.PI * 6}`}
                    strokeDashoffset={`${2 * Math.PI * 6 * (1 - (progress * 7 - currentSection))}`}
                    className="transition-all duration-300"
                  />
                </svg>
              </div>
            )}

            {/* Section Label */}
            <div className="absolute left-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 rounded px-3 py-1">
                <span className="text-cyan-400 text-sm font-mono whitespace-nowrap">{section}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-1 h-32 bg-cyan-400/20 rounded-full overflow-hidden">
        <div
          className="w-full bg-gradient-to-t from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Scroll Hint */}
      {currentSection === 0 && (
        <div className="mt-6 text-center animate-pulse">
          <div className="text-cyan-400/60 text-xs font-mono mb-2">SCROLL</div>
          <div className="w-6 h-10 border-2 border-cyan-400/30 rounded-full mx-auto relative">
            <div className="w-1 h-3 bg-cyan-400/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce" />
          </div>
        </div>
      )}
    </div>
  )
}
