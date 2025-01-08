'use client'

import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Section {
  id: string
  title: string
  fields?: Array<{
    label: string
    value: string
  }>
}

interface SavedInformationProps {
  isCollapsed: boolean
}

export function SavedInformation({ isCollapsed }: SavedInformationProps) {
  const sections: Section[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      fields: [
        { label: 'First name', value: 'Rovic' },
        { label: 'Last name', value: 'Villaralvo' },
        { label: 'Gender', value: 'Male' },
        { label: 'Birthday', value: 'Feb 25, 2004' },
        { label: 'States', value: 'Illinois' },
        { label: 'City', value: 'Springfield' },
        { label: 'Street', value: '123 Main Street' },
        { label: 'ZIP Code', value: '62704' },
      ]
    },
    {
      id: 'household',
      title: 'Household and Application Details',
      fields: [
        { label: 'Household Size', value: '3' },
        { label: 'Dependents', value: '1' },
        { label: 'Application Type', value: 'Individual' },
      ]
    },
    {
      id: 'financial',
      title: 'Marital, Tax, and Financial Info',
      fields: [
        { label: 'Marital Status', value: 'Married' },
        { label: 'Filing Status', value: 'Married Filing Jointly' },
        { label: 'Annual Income', value: '$75,000' },
      ]
    },
    {
      id: 'health',
      title: 'Health, Citizenship and Disability Info',
      fields: [
        { label: 'Citizenship Status', value: 'U.S. Citizen' },
        { label: 'Disability Status', value: 'None' },
      ]
    },
    {
      id: 'coverage',
      title: 'Coverage, Employment and Consent',
      fields: [
        { label: 'Current Coverage', value: 'None' },
        { label: 'Employment Status', value: 'Employed' },
        { label: 'Consent Given', value: 'Yes' },
      ]
    }
  ]

  if (isCollapsed) {
    return (
      <div className="py-4 flex flex-col items-center">
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-medium">
          SI
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="font-medium">Saved Information</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Accordion type="single" collapsible className="w-full" defaultValue="personal">
          {sections.map((section) => (
            <AccordionItem value={section.id} key={section.id}>
              <AccordionTrigger className="px-4 py-2 text-sm font-medium hover:bg-gray-50">
                {section.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-4 py-2 space-y-2">
                  {section.fields?.map((field) => (
                    <div key={field.label} className="text-sm">
                      <div className="text-gray-500">{field.label}</div>
                      <div className="font-medium">{field.value}</div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

