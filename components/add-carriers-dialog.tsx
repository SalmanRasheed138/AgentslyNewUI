'use client'

import * as React from 'react'
import { Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Carrier {
  id: string
  name: string
  popular?: boolean
}

const carriers: Carrier[] = [
  { id: 'aetna', name: 'Aetna', popular: true },
  { id: 'cigna', name: 'Cigna', popular: true },
  { id: 'ambetter', name: 'Ambetter' },
  { id: 'anthem', name: 'Anthem' },
  { id: 'molina', name: 'Molina Healthcare' },
  { id: 'molina-kaiser', name: 'Molina Kaiser Permanente' },
  { id: 'qualchoice', name: 'QualChoice' },
  { id: 'bcbs', name: 'Blue Cross Blue Shield', popular: true },
  { id: 'humana', name: 'Humana', popular: true },
  { id: 'uhc', name: 'United Healthcare', popular: true },
  { id: 'centene', name: 'Centene' },
  { id: 'hsc', name: 'Health Care Service Corporation(HSC)' },
  { id: 'oscar', name: 'Oscar Health' },
  { id: 'sharp', name: 'Sharp Health' },
]

interface AddCarriersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (selectedCarriers: string[]) => void
  initialSelected?: string[]
}

export function AddCarriersDialog({ 
  open, 
  onOpenChange, 
  onSave,
  initialSelected = []
}: AddCarriersDialogProps) {
  const [search, setSearch] = React.useState('')
  const [filter, setFilter] = React.useState('all')
  const [selected, setSelected] = React.useState<string[]>(initialSelected)

  const filteredCarriers = carriers.filter(carrier => {
    const matchesSearch = carrier.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'popular') {
      return matchesSearch && carrier.popular
    }
    return matchesSearch
  })

  const handleSelectAll = () => {
    setSelected(filteredCarriers.map(c => c.id))
  }

  const handleRemoveAll = () => {
    setSelected([])
  }

  const toggleCarrier = (id: string) => {
    setSelected(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const handleSave = () => {
    onSave(selected)
    onOpenChange(false)
  }

  // Split carriers into two columns
  const midPoint = Math.ceil(filteredCarriers.length / 2)
  const leftColumn = filteredCarriers.slice(0, midPoint)
  const rightColumn = filteredCarriers.slice(midPoint)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Add Carriers</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search message"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSelectAll}
              className="h-8 px-3"
            >
              Select All
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleRemoveAll}
              className="h-8 px-3"
            >
              Remove All
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-h-[400px] overflow-y-auto pr-4">
            <div className="space-y-3">
              {leftColumn.map((carrier) => (
                <label
                  key={carrier.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selected.includes(carrier.id)}
                    onCheckedChange={() => toggleCarrier(carrier.id)}
                  />
                  <span className="text-sm">{carrier.name}</span>
                </label>
              ))}
            </div>
            <div className="space-y-3">
              {rightColumn.map((carrier) => (
                <label
                  key={carrier.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <Checkbox
                    checked={selected.includes(carrier.id)}
                    onCheckedChange={() => toggleCarrier(carrier.id)}
                  />
                  <span className="text-sm">{carrier.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="border-t pt-4 gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Go back
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

