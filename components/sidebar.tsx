'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Book, Users, MessageCircle, ChevronLeft, Settings2, Menu } from 'lucide-react'
import Image from 'next/image'

const navItems = [
  { icon: Book, label: 'Page Flow', href: '/page-flow' },
  { icon: Users, label: 'Simple CRM', href: '/simple-crm' },
  { icon: MessageCircle, label: 'Omni Chat', href: '/omni-chat' },
]

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function Sidebar({ isMobileMenuOpen, onMobileMenuToggle }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setIsCollapsed(false)
      } else if (window.innerWidth >= 992) {
        setIsCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call once to set initial state

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        onMobileMenuToggle()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen, onMobileMenuToggle])

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden fixed top-0 left-0 m-2 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMobileMenuToggle}
          className="text-white bg-[#312E81] hover:bg-[#312E81]/90"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`bg-[#312E81] text-white transition-all duration-300 h-full
          ${isCollapsed && !isMobileMenuOpen ? 'w-[60px]' : 'w-64 z-50'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed top-0 left-0 z-40 lg:relative lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-white/10">
            {(!isCollapsed || isMobileMenuOpen) && (
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Agentsly.ai"
                  width={140}
                  height={24}
                  className="flex-shrink-0"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 hidden lg:flex"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronLeft className={`h-5 w-5 transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-2 py-4">
            {(!isCollapsed || isMobileMenuOpen) && (
              <div className="mb-2 px-2">
                <h2 className="text-xs font-semibold text-white/70">SHAREABLE PAGE</h2>
              </div>
            )}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition-colors ${
                    pathname === item.href ? 'bg-white/10' : ''
                  } ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''}`}
                >
                  <item.icon className="h-5 w-5" />
                  {(!isCollapsed || isMobileMenuOpen) && <span>{item.label}</span>}
                </Link>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-2 mt-auto">
            <Link
              href="/account-settings"
              className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition-colors ${
                pathname === '/account-settings' ? 'bg-white/10' : ''
              } ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : ''}`}
            >
              <Settings2 className="h-5 w-5" />
              {(!isCollapsed || isMobileMenuOpen) && <span>Account Settings</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

