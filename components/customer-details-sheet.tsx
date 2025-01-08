'use client'

import * as React from 'react'
import { X, ExternalLink, Heart, SmileIcon as Tooth, Cross, User, Clock, ChevronRight, Bot } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface CustomerDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer?: {
    name: string
    email: string
    phone: string
    zipCode: string
    firstName: string
    lastName: string
    birthday: string
    ssn: string
    dependents: number
  }
}

interface ChatMessage {
  type: 'ai' | 'user'
  content: string | React.ReactNode
}

export function CustomerDetailsSheet({ open, onOpenChange, customer }: CustomerDetailsSheetProps) {
  const insuranceTypes = [
    { label: 'Final', value: 10, color: 'rgb(14, 165, 233)' },
    { label: 'Medicare', value: 10, color: 'rgb(37, 99, 235)' },
    { label: 'ACA', value: 10, color: 'rgb(99, 102, 241)' },
    { label: 'Dental', value: 10, color: 'rgb(168, 85, 247)' },
  ]

  const chatHistory: ChatMessage[] = [
    {
      type: 'ai',
      content: (
        <div className="space-y-3 leading-relaxed">
          <p>
            Hi there! My name is Friendly AI (Agentsly AI) AI assistant. Agentsly AI is a licensed healthcare insurance agent (NPN: ). Whether you're exploring healthcare options or need expert advice, I'm here to help you find the best plan tailored to your needs.
          </p>
          <p>
            Feel free to reach out via email at <span className="font-medium">agentsly.ai@gmail.com</span> or give me a call at <span className="font-medium">+1 201-555-1234</span>.
          </p>
          <p>
            To get started, could you please share your zip code, yearly salary, and age? I'll then be able to recommend the perfect healthcare plan for you!
          </p>
        </div>
      )
    },
    {
      type: 'user',
      content: (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="font-medium">Name</span>
          </div>
          <p>76520, 22K, 37</p>
        </div>
      )
    },
    {
      type: 'ai',
      content: (
        <div className="space-y-4">
          <p>
            Hi Jane, thank you so much for your patience. I've found a few healthcare plans that match your needs in the 76520 area:
          </p>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-medium">1. UHC Bronze Virtual First by UnitedHealthcare</p>
              <p className="italic">
                Unlimited $0 app-based care, $3 tier 2 prescriptions, and $0 insulin. It's a great option if you're looking for affordable virtual care.
              </p>
              <div className="space-y-1">
                <p><span className="font-medium">Deductible:</span> $7,250</p>
                <p><span className="font-medium">Out-of-Pocket Limit:</span> $9,450</p>
                <p><span className="font-medium">Primary Care Visits:</span> $0 copay in-network</p>
              </div>
            </div>
            <div>
              <p className="font-medium">2. UHC Bronze Standard by UnitedHealthcare</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto p-4 sm:p-6">
        <SheetHeader className="flex-row items-center justify-between border-b pb-4">
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="gap-2">
            Open in omni chat
            <ExternalLink className="h-4 w-4" />
          </Button>
        </SheetHeader>

        <div className="space-y-8 py-6">
          {/* Profile Section */}
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 bg-blue-100">
              <AvatarFallback className="text-blue-700">RV</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">Name</h3>
              <p className="text-sm text-muted-foreground">{customer?.email || 'Email@gmail.com'}</p>
              <p className="text-sm text-muted-foreground">+217-972-7003</p>
            </div>
          </div>

          {/* Insurance Progress Section */}
          <div className="relative">
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-4 min-w-max px-1">
                {insuranceTypes.map((insurance, index) => (
                  <div key={index} className="text-center w-[100px]">
                    <div className="relative inline-flex">
                      <svg className="w-16 h-16">
                        <circle
                          className="text-muted stroke-current"
                          strokeWidth="2"
                          stroke="currentColor"
                          fill="transparent"
                          r="30"
                          cx="32"
                          cy="32"
                        />
                        <circle
                          className="stroke-current"
                          strokeWidth="2"
                          strokeLinecap="round"
                          stroke={insurance.color}
                          fill="transparent"
                          r="30"
                          cx="32"
                          cy="32"
                          style={{
                            strokeDasharray: `${2 * Math.PI * 30}`,
                            strokeDashoffset: `${2 * Math.PI * 30 * (1 - insurance.value / 100)}`,
                            transform: 'rotate(-90deg)',
                            transformOrigin: 'center',
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-medium">{insurance.value}</span>
                      </div>
                    </div>
                    <p className="text-sm mt-2">{insurance.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <Tabs defaultValue="aca" className="w-full">
            <TabsList className="w-full flex justify-between bg-transparent gap-1 px-0">
              <TabsTrigger 
                value="history" 
                className="flex-1 gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] rounded-none px-2 [&_svg]:data-[state=active]:text-[#4F46E5]"
              >
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger 
                value="aca" 
                className="flex-1 gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] rounded-none px-2 [&_svg]:data-[state=active]:text-[#4F46E5]"
              >
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">ACA</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dental" 
                className="flex-1 gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] rounded-none px-2 [&_svg]:data-[state=active]:text-[#4F46E5]"
              >
                <Tooth className="h-4 w-4" />
                <span className="hidden sm:inline">Dental</span>
              </TabsTrigger>
              <TabsTrigger 
                value="medicare" 
                className="flex-1 gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] rounded-none px-2 [&_svg]:data-[state=active]:text-[#4F46E5]"
              >
                <Cross className="h-4 w-4" />
                <span className="hidden sm:inline">Medicare</span>
              </TabsTrigger>
              <TabsTrigger 
                value="final" 
                className="flex-1 gap-1 text-xs data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#4F46E5] data-[state=active]:text-[#4F46E5] rounded-none px-2 [&_svg]:data-[state=active]:text-[#4F46E5]"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Final</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="history">
              <div className="space-y-6">
                {chatHistory.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "text-sm",
                      message.type === 'ai' ? "bg-muted/50 rounded-lg p-4" : "px-4"
                    )}
                  >
                    {message.content}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="aca">
              {/* Customer Information */}
              <div className="space-y-6">
                <div 
                  className="flex items-center justify-between py-4 cursor-pointer hover:bg-muted/50 -mx-6 px-6"
                  onClick={() => {}}
                >
                  <h3 className="text-lg font-medium">Section Title</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Zip code</p>
                    <p className="mt-1">{customer?.zipCode || '398482'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">First name</p>
                    <p className="mt-1">{customer?.firstName || 'Ethal'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Last name</p>
                    <p className="mt-1">{customer?.lastName || 'Cox'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Birthday</p>
                    <p className="mt-1">{customer?.birthday || 'Jan 28, 1995'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone number</p>
                    <p className="mt-1">505-242-0103</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="mt-1">EthelAcox@dayrep.com</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">SSN</p>
                    <p className="mt-1">{customer?.ssn || '525-33-8734'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dependents</p>
                    <p className="mt-1">{customer?.dependents || '0'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="mt-1">—</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="mt-1">—</p>
                </div>
              </div>

                <div 
                  className="flex items-center justify-between py-4 cursor-pointer hover:bg-muted/50 -mx-6 px-6"
                  onClick={() => {}}
                >
                  <h3 className="text-lg font-medium">Section Title</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>

                <div 
                  className="flex items-center justify-between py-4 cursor-pointer hover:bg-muted/50 -mx-6 px-6"
                  onClick={() => {}}
                >
                  <h3 className="text-lg font-medium">Section Title</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>

                <div 
                  className="flex items-center justify-between py-4 cursor-pointer hover:bg-muted/50 -mx-6 px-6"
                  onClick={() => {}}
                >
                  <h3 className="text-lg font-medium">Section Title</h3>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
            </TabsContent>

            <TabsContent value="dental">
              <div className="py-4 text-center text-muted-foreground">
                Dental information will appear here
              </div>
            </TabsContent>

            <TabsContent value="medicare">
              <div className="py-4 text-center text-muted-foreground">
                Medicare information will appear here
              </div>
            </TabsContent>

            <TabsContent value="final">
              <div className="py-4 text-center text-muted-foreground">
                Final information will appear here
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  )
}

