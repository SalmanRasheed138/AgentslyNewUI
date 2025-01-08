'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Moon, Sun, Phone, HelpCircle, ArrowRight, LayoutGrid, FileQuestionIcon as QuestionMarkIcon, ChevronLeft, ChevronRight, X, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { SavedInformation } from './saved-information'
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from 'next-themes'

export function LandingLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isCallPopoverOpen, setIsCallPopoverOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <style jsx global>{`
        .scrollbar-thick::-webkit-scrollbar {
          width: 12px;
        }
        .scrollbar-thick::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 6px;
        }
        .scrollbar-thick::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 6px;
        }
        .scrollbar-thick::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
      <div className={`min-h-screen flex flex-col ${theme}`}>
      {/* Navigation */}
      <nav className="border-b relative z-[60]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-[#6C5CE7] z-50"
              >
                <ChevronRight className={cn(
                  "h-5 w-5 transition-transform duration-200",
                  isSidebarOpen && "rotate-180"
                )} />
              </Button>
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Agentsly.ai"
                  width={140}
                  height={24}
                  className="flex-shrink-0 hidden sm:block"
                />
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center gap-2 sm:hidden">
              <Button variant="ghost" size="icon">
                <LayoutGrid className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <Popover open={isCallPopoverOpen} onOpenChange={setIsCallPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call the agent?
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[380px] p-0 z-[100]">
                  <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-base font-semibold">Progress</h2>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-auto w-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => setIsCallPopoverOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Progress Section */}
                    <div className="px-4 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Dental</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} className="h-2" indicatorColor="bg-[#6C5CE7]" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>ACA Health</span>
                          <span>50%</span>
                        </div>
                        <Progress value={50} className="h-2" indicatorColor="bg-[#6C5CE7]" />
                      </div>

                      <div className="flex items-start gap-2 p-3 bg-[#6C5CE7]/5 rounded-lg text-sm">
                        <Info className="h-4 w-4 text-[#6C5CE7] mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">
                          Reach at least 30% progress to submit a form. We recommend you to reach 70% to get the best result.
                        </p>
                      </div>
                    </div>

                    {/* Agent Information */}
                    <div className="border-t">
                      <div className="px-4 py-6">
                        <h3 className="text-sm font-medium mb-4">Agent Information</h3>
                        <div className="flex items-center gap-3 mb-6">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="/placeholder.svg" alt="Agent" />
                            <AvatarFallback>SM</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">Shawn Milner</span>
                        </div>
                        <div className="space-y-4 text-sm">
                          <div className="grid grid-cols-3 items-center">
                            <span className="text-muted-foreground">NPN</span>
                            <span className="col-span-2">6834567890</span>
                          </div>
                          <div className="grid grid-cols-3 items-center">
                            <span className="text-muted-foreground">Email</span>
                            <span className="col-span-2">shawn@gmail.com</span>
                          </div>
                          <div className="grid grid-cols-3 items-center">
                            <span className="text-muted-foreground">Number</span>
                            <span className="col-span-2">+1 916-313-1567</span>
                          </div>
                          <div className="grid grid-cols-3 items-center">
                            <span className="text-muted-foreground">Agency</span>
                            <span className="col-span-2">SM LABS LLC</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t p-4 space-y-2">
                      <Button variant="outline" className="w-full">
                        Save Progress
                      </Button>
                      <Button className="w-full bg-[#6C5CE7] hover:bg-[#6C5CE7]/90">
                        Review and Submit
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="ghost">Sign up</Button>
              <Button className="bg-[#6C5CE7] hover:bg-[#6C5CE7]/90">Login</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Sidebar */}
        {isSidebarOpen && (
          <div 
            className={cn(
              "fixed inset-y-0 left-0 z-[70] bg-white border-r transition-all duration-300 flex flex-col overflow-hidden",
              isSidebarCollapsed ? "w-[60px]" : "w-[300px]",
              "scrollbar-thick"
            )}
          >
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
                className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            <div className="flex-1">
              <SavedInformation isCollapsed={isSidebarCollapsed} />
            </div>
          </div>
        )}
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="py-4 border-t relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2024 Agentsly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        size="icon"
        className="fixed bottom-6 right-6 rounded-full shadow-lg bg-white hover:bg-gray-50 border text-[#6C5CE7] z-50"
      >
        <QuestionMarkIcon className="h-4 w-4" />
      </Button>
      </div>
    </>
  )
}

