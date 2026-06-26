import type { Metadata } from 'next'
import './globals.css'
import PageFrame from '@/components/PageFrame'
import TopBanner from '@/components/TopBanner'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'RL Skills Library',
  description: 'A browseable library of Claude Code skills for the Rocketlane team.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PageFrame>
          <TopBanner />
          <main>{children}</main>
          <Footer />
        </PageFrame>
      </body>
    </html>
  )
}
