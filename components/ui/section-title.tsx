"use client"

interface SectionTitleProps {
  currentSection: number
}

const sectionTitles = [
  { title: "INITIALIZING", subtitle: "Welcome to the experience" },
  { title: "WORKSPACE", subtitle: "Developer environment" },
  { title: "ABOUT", subtitle: "Getting to know me" },
  { title: "PROJECTS", subtitle: "My work showcase" },
  { title: "SKILLS", subtitle: "Technical expertise" },
  { title: "EDUCATION", subtitle: "Academic journey" },
  { title: "INTERESTS", subtitle: "Passions & hobbies" },
  { title: "CONTACT", subtitle: "Let's connect" },
]

export default function SectionTitle({ currentSection }: SectionTitleProps) {
  const current = sectionTitles[currentSection] || sectionTitles[0]

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/40 backdrop-blur-md border border-cyan-400/30 rounded-lg px-6 py-3">
        <div className="text-center">
          <div className="text-cyan-400 font-mono text-lg font-bold mb-1">{current.title}</div>
          <div className="text-cyan-300/60 text-sm">{current.subtitle}</div>
        </div>
      </div>
    </div>
  )
}
