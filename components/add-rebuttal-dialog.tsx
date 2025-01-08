'use client'

import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Pencil, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { addRebuttal, updateRebuttal, Rebuttal } from '@/lib/slices/rebuttalSlice'

interface AddRebuttalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  editingRebuttal: Rebuttal | null
}

export function AddRebuttalDialog({
  open,
  onOpenChange,
  editingRebuttal
}: AddRebuttalDialogProps) {
  const dispatch = useDispatch()
  const [question, setQuestion] = React.useState('')
  const [answer, setAnswer] = React.useState('')

  React.useEffect(() => {
    if (editingRebuttal) {
      setQuestion(editingRebuttal.question)
      setAnswer(editingRebuttal.answer)
    } else {
      setQuestion('')
      setAnswer('')
    }
  }, [editingRebuttal])

  const handleSave = () => {
    if (editingRebuttal) {
      dispatch(updateRebuttal({ id: editingRebuttal.id, question, answer }))
    } else {
      dispatch(addRebuttal({ question, answer }))
    }
    setQuestion('')
    setAnswer('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle>{editingRebuttal ? 'Edit rebuttal' : 'Add rebuttal'}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-auto w-auto p-0 hover:bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="p-6 pt-2 space-y-6">
          <div className="space-y-2">
            <label className="text-base font-medium">Question</label>
            <div className="relative">
              <Input
                placeholder="Add question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="pr-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Answer</label>
            <div className="relative">
              <Textarea
                placeholder="Add answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="min-h-[100px] resize-none pr-9"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-5 w-5 text-muted-foreground hover:text-foreground"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t p-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#4F46E5] hover:bg-[#4F46E5]/90"
            onClick={handleSave}
            disabled={!question || !answer}
          >
            {editingRebuttal ? 'Save Changes' : 'Add'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

