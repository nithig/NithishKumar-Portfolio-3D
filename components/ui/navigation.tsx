"use client"

import { useState } from "react"

interface NavigationProps {
  currentSection: number
}

const navItems = [
  { name: "EMAIL", url: "mailto:gnithishdeveloper@gmail.com" },
  { name: "PORTFOLIO", url: "https://www.nithishdeveloper.wuaze.com/" },
  { name: "GITHUB", url: "https://github.com" },
  { name: "LINKEDIN", url: "https://linkedin.com" },
]

export default function Navigation({ currentSection }: NavigationProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav className="fixed top-8 left-8 z-50">
      {/* Main Brand Card */}
      <div className="bg-black/30 backdrop-blur-md border border-cyan-400/30 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
          <div>
            <div className="text-cyan-400 font-mono text-lg font-bold">NITHISHKUMAR.DEV</div>
            <div className="text-cyan-300/60 text-xs">Section {currentSection + 1} / 8</div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-3 w-full h-1 bg-cyan-400/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentSection + 1) / 8) * 100}%` }}
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-3 text-cyan-400/80 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-300 text-sm font-mono"
        >
          QUICK LINKS {isExpanded ? "▼" : "▶"}
        </button>

        {isExpanded && (
          <div className="space-y-1 animate-in slide-in-from-top-2 duration-300">
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.url}
                target={item.url.startsWith("http") ? "_blank" : "_self"}
                rel={item.url.startsWith("http") ? "noopener noreferrer" : ""}
                className="block bg-black/20 backdrop-blur-sm border border-cyan-400/10 rounded px-3 py-2 text-cyan-400/60 hover:text-cyan-400 hover:border-cyan-400/30 text-xs font-mono transition-all duration-300"
                style={{
                  animation: `fadeInLeft 0.3s ease-out ${index * 0.1}s both`,
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="mt-4 bg-black/20 backdrop-blur-sm border border-green-400/20 rounded-lg p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-xs font-mono">SYSTEM ONLINE</span>
        </div>
        <div className="text-green-300/60 text-xs font-mono mt-1">Ready for collaboration</div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  )
}
