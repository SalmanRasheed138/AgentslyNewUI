'use client'

import * as React from "react"
import { CalendarIcon, X } from 'lucide-react'
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DateRangePickerProps {
  className?: string
}

export function DateRangePicker({ className }: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 11, 2), // December 2, 2024
    to: new Date(2024, 0, 2),    // January 2, 2024
  })
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-4", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-4 space-y-4">
            <Select defaultValue="last-30-days">
              <SelectTrigger>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Start date</div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal"
                >
                  {date?.from ? format(date.from, "PP") : "Pick a date"}
                  {date?.from && (
                    <X 
                      className="ml-auto h-4 w-4 opacity-50 hover:opacity-100" 
                      onClick={() => setDate(prev => ({ ...prev, from: undefined }))}
                    />
                  )}
                </Button>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">End date</div>
                <Button 
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {date?.to ? format(date.to, "PP") : "Pick a date"}
                  {date?.to && (
                    <X 
                      className="ml-auto h-4 w-4 opacity-50 hover:opacity-100" 
                      onClick={() => setDate(prev => ({ ...prev, to: undefined }))}
                    />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="rounded-md border"
                classNames={{
                  day_selected: "bg-[#4F46E5] text-white hover:bg-[#4F46E5] hover:text-white focus:bg-[#4F46E5] focus:text-white",
                  day_today: "bg-accent text-accent-foreground",
                }}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setIsOpen(false)}
                className="bg-[#4F46E5] hover:bg-[#4F46E5]/90"
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

