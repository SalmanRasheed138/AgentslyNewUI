'use client'

import * as React from 'react'
import { Info, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ProgressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProgressDialog({ open, onOpenChange }: ProgressDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-4 flex flex-row items-center justify-between space-y-0">
          <DialogTitle>Progress</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-0 hover:bg-transparent"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
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
      </DialogContent>
    </Dialog>
  )
}

