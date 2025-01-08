'use client'

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MoreHorizontal, Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AddRebuttalDialog } from './add-rebuttal-dialog'
import { RootState } from '@/lib/store'
import { deleteRebuttal, setEditingRebuttal } from '@/lib/slices/rebuttalSlice'

export function Rebuttals() {
  const dispatch = useDispatch()
  const rebuttals = useSelector((state: RootState) => state.rebuttals.rebuttals)
  const editingRebuttal = useSelector((state: RootState) => state.rebuttals.editingRebuttal)
  const [addDialogOpen, setAddDialogOpen] = React.useState(false)

  const handleDelete = (id: string) => {
    dispatch(deleteRebuttal(id))
  }

  const handleEdit = (id: string) => {
    dispatch(setEditingRebuttal(id))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Craft your rebuttals</h2>
        <Button 
          className="bg-[#4F46E5] hover:bg-[#4F46E5]/90"
          onClick={() => setAddDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add rebuttal
        </Button>
      </div>

      <div className="space-y-4">
        {rebuttals.map((rebuttal) => (
          <Card key={rebuttal.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Questions</div>
                  <div>{rebuttal.question}</div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={() => handleEdit(rebuttal.id)}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex items-center gap-2 text-red-600 focus:text-red-600"
                      onClick={() => handleDelete(rebuttal.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Answer</div>
                <div className="text-sm">{rebuttal.answer}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AddRebuttalDialog
        open={addDialogOpen || editingRebuttal !== null}
        onOpenChange={(open) => {
          if (!open) {
            setAddDialogOpen(false)
            dispatch(setEditingRebuttal(null))
          }
        }}
        editingRebuttal={editingRebuttal}
      />
    </div>
  )
}

