'use client'

import * as React from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface Tab {
  value: string
  label: string
}

interface TabsNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (value: string) => void
}

export function TabsNavigation({ tabs, activeTab, onTabChange }: TabsNavigationProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="h-auto p-0 bg-transparent flex flex-wrap justify-start w-full">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "px-4 py-2 rounded-none font-normal data-[state=active]:font-medium",
              "border-b-2 border-transparent data-[state=active]:border-[#4F46E5]",
              "text-muted-foreground data-[state=active]:text-[#4F46E5]",
              "flex-shrink-0"
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

