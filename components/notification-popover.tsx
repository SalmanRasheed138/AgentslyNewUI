'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  message: string
  timestamp: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: '1',
    message: 'Please clearly articulate the notification sentence here, including all necessary details for better understanding.',
    timestamp: 'Oct 11 at 06:41 p.m.',
    read: false
  },
  {
    id: '2',
    message: 'Please clearly articulate the notification sentence here, including all necessary details for better understanding.',
    timestamp: 'Oct 11 at 06:41 p.m.',
    read: true
  },
  {
    id: '3',
    message: 'Please clearly articulate the notification sentence here, including all necessary details for better understanding.',
    timestamp: 'Oct 11 at 06:41 p.m.',
    read: true
  },
]

export function NotificationPopover({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState('unread')

  const filteredNotifications = notifications.filter(notification => 
    activeTab === 'all' || (activeTab === 'unread' && !notification.read)
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-base font-semibold">Notification</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-auto w-auto p-0 text-muted-foreground hover:text-foreground"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b px-4">
            <TabsList className="h-auto p-0 bg-transparent">
              <TabsTrigger
                value="unread"
                className={cn(
                  "px-4 py-2 rounded-none font-normal data-[state=active]:font-medium",
                  "border-b-2 border-transparent data-[state=active]:border-[#4F46E5]",
                  "text-muted-foreground data-[state=active]:text-[#4F46E5]"
                )}
              >
                Unread
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className={cn(
                  "px-4 py-2 rounded-none font-normal data-[state=active]:font-medium",
                  "border-b-2 border-transparent data-[state=active]:border-[#4F46E5]",
                  "text-muted-foreground data-[state=active]:text-[#4F46E5]"
                )}
              >
                All
              </TabsTrigger>
            </TabsList>
          </div>
          <ScrollArea className="h-[400px]">
            <div className="divide-y">
              {filteredNotifications.map((notification, index) => (
                <div key={notification.id} className="flex gap-3 p-4">
                  <div className="relative flex-shrink-0">
                    <div className="h-8 w-8 rounded bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center text-sm font-medium">
                      RV
                    </div>
                    {!notification.read && index === 0 && (
                      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

