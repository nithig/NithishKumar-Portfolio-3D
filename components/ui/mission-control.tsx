"use client"

interface MissionControlProps {
  currentSection: number
}

const missionData = [
  {
    title: "SYSTEM INITIALIZATION",
    objective: "Welcome to the immersive portfolio experience",
    status: "COMPLETE",
  },
  {
    title: "WORKSPACE INFILTRATION",
    objective: "Accessing developer environment",
    status: "IN_PROGRESS",
  },
  {
    title: "WORKSPACE ANALYSIS",
    objective: "Scanning development setup",
    status: "PENDING",
  },
  {
    title: "HOLOGRAM PROJECTION",
    objective: "Loading personal data matrix",
    status: "PENDING",
  },
  {
    title: "PROJECTS COMPILATION",
    objective: "Retrieving project archives",
    status: "PENDING",
  },
  {
    title: "NEURAL MAPPING",
    objective: "Analyzing skill networks",
    status: "PENDING",
  },
  {
    title: "TIMELINE ACCESS",
    objective: "Educational data retrieval",
    status: "PENDING",
  },
  {
    title: "GALAXY EXPLORATION",
    objective: "Interest pattern analysis",
    status: "PENDING",
  },
  {
    title: "CONTACT PROTOCOL",
    objective: "Establishing communication",
    status: "PENDING",
  },
]

export default function MissionControl({ currentSection }: MissionControlProps) {
  return (
    <div className="fixed m-2 top-12 left-100 pointer-events-none">
      <div className="bg-black/60 backdrop-blur-md border border-green-400/30 rounded-lg p-4 max-w-sm">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-400 font-mono text-sm font-bold">MISSION CONTROL</span>
        </div>

        <div className="space-y-2">
          <div className="text-white font-mono text-sm font-bold">
            {missionData[currentSection]?.title || "UNKNOWN MISSION"}
          </div>
          <div className="text-gray-300 font-mono text-xs">
            {missionData[currentSection]?.objective || "No objective data"}
          </div>

          <div className="flex items-center space-x-2 mt-2">
            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-yellow-400 font-mono text-xs">
              {currentSection < missionData.length - 1 ? "IN_PROGRESS" : "MISSION_COMPLETE"}
            </span>
          </div>
        </div>

        {/* Mini Progress */}
        <div className="mt-3 pt-3 border-t border-green-400/20">
          <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
            <span>PROGRESS</span>
            <span>
              {currentSection + 1}/{missionData.length}
            </span>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${((currentSection + 1) / missionData.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
