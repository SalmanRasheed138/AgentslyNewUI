'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Sidebar } from '@/components/sidebar'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLandingPage = pathname === '/'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {isLandingPage ? (
            children
          ) : (
            <div className="flex h-screen">
              <Sidebar 
                isMobileMenuOpen={isMobileMenuOpen} 
                onMobileMenuToggle={toggleMobileMenu}
              />
              <main className="flex-1 overflow-y-auto overflow-x-hidden">
                {children}
              </main>
            </div>
          )}
        </Providers>
      </body>
    </html>
  )
}

