import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NithishKumar | Portfolio -Immersive 3D Web Experience',
  description: 'Created by NithishKumar',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
