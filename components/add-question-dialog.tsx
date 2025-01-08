'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

interface AddQuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (question: QuestionData) => void
}

export interface QuestionData {
  label: string;
  placeholder: string;
  required: boolean;
  description?: string;
}

export function AddQuestionDialog({ 
  open, 
  onOpenChange,
  onSave 
}: AddQuestionDialogProps) {
  const [questionData, setQuestionData] = React.useState<QuestionData>({
    label: '',
    placeholder: '',
    required: true,
    description: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(questionData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-2">
            <Label htmlFor="label">Question Label</Label>
            <Input
              id="label"
              value={questionData.label}
              onChange={(e) => setQuestionData({ ...questionData, label: e.target.value })}
              placeholder="Enter question label"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="placeholder">Placeholder Text</Label>
            <Input
              id="placeholder"
              value={questionData.placeholder}
              onChange={(e) => setQuestionData({ ...questionData, placeholder: e.target.value })}
              placeholder="Enter placeholder text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={questionData.description}
              onChange={(e) => setQuestionData({ ...questionData, description: e.target.value })}
              placeholder="Enter additional description or instructions"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Question</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

