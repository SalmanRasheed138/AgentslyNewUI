'use client'

import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { PlusCircle, GripVertical, MoreVertical, Pencil, Trash2, Edit2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { addSection, removeSection, updateSection } from '@/lib/slices/sectionsSlice'
import { addQuestion, removeQuestion, updateQuestion, reorderQuestions } from '@/lib/slices/questionsSlice'
import { RootState } from '@/lib/store'

interface RightColumnProps {
  title: string
  onOpenCarriersDialog: () => void
  selectedCarriers: Array<{ id: string; name: string }>
  isCustomizationEnabled: boolean
  onToggleCustomization: () => void
}

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-2">
      <div className={`flex items-center gap-3 p-3 border rounded-md ${isDragging ? 'bg-gray-100' : 'bg-white'}`}>
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        {children}
      </div>
    </div>
  );
}

export function RightColumn({ 
  title, 
  onOpenCarriersDialog,
  selectedCarriers,
  isCustomizationEnabled,
  onToggleCustomization
}: RightColumnProps) {
  const dispatch = useDispatch()
  const sections = useSelector((state: RootState) => state.sections.sections)
  const questions = useSelector((state: RootState) => state.questions.questions)
  const [editingSectionId, setEditingSectionId] = React.useState<string | null>(null)
  const [editingTitle, setEditingTitle] = React.useState('')
  const [editingQuestionId, setEditingQuestionId] = React.useState<string | null>(null)
  const [editingQuestionValue, setEditingQuestionValue] = React.useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleAddSection = () => {
    dispatch(addSection({
      id: `section-${Date.now()}`,
      title: 'New Section',
    }))
  }

  const handleDeleteSection = (sectionId: string) => {
    dispatch(removeSection(sectionId))
  }

  const startEditing = (section: { id: string; title: string }) => {
    setEditingSectionId(section.id)
    setEditingTitle(section.title)
  }

  const handleEditSave = (sectionId: string) => {
    dispatch(updateSection({ id: sectionId, title: editingTitle }))
    setEditingSectionId(null)
    setEditingTitle('')
  }

  const handleAddQuestion = (sectionId: string) => {
    dispatch(addQuestion({
      id: `question-${Date.now()}`,
      sectionId,
      value: 'New Question'
    }))
  }

  const handleEditQuestion = (questionId: string, newValue: string) => {
    dispatch(updateQuestion({ id: questionId, value: newValue }))
    setEditingQuestionId(null)
    setEditingQuestionValue('')
  }

  const handleDeleteQuestion = (questionId: string) => {
    dispatch(removeQuestion(questionId))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeQuestion = questions.find(q => q.id === active.id);
      const overQuestion = questions.find(q => q.id === over.id);
      
      if (activeQuestion && overQuestion && activeQuestion.sectionId === overQuestion.sectionId) {
        const sectionQuestions = questions.filter(q => q.sectionId === activeQuestion.sectionId);
        const oldIndex = sectionQuestions.findIndex(q => q.id === active.id);
        const newIndex = sectionQuestions.findIndex(q => q.id === over.id);
        
        const newOrder = arrayMove(sectionQuestions, oldIndex, newIndex);
        dispatch(reorderQuestions({
          sectionId: activeQuestion.sectionId,
          questionIds: newOrder.map(q => q.id)
        }));
      }
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
        <Button variant="primary" className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90">
          Save
        </Button>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="font-medium mb-4">Choose your health insurance carrier</h3>
          <div className="space-y-4">
            <Button 
              variant="primary"
              onClick={onOpenCarriersDialog}
              className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Carriers
            </Button>
            {selectedCarriers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCarriers.slice(0, 10).map((carrier) => (
                  <div 
                    key={carrier.id}
                    className="text-sm px-2 py-1 bg-muted rounded-md"
                  >
                    {carrier.name}
                  </div>
                ))}
                {selectedCarriers.length > 10 && (
                  <div className="text-sm text-muted-foreground">
                    +{selectedCarriers.length - 10} more
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">How should the chatbot present plan recommendations?</h3>
          <RadioGroup defaultValue="one" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one" id="one" className="border-[#4338CA] text-[#4338CA]" />
              <Label htmlFor="one">One best plan and reason why</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="three" id="three" className="border-[#4338CA] text-[#4338CA]" />
              <Label htmlFor="three">The best 3 plans</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-medium mb-4">Customize your question</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop to change how your questions are presented by the chatbot.
          </p>
          <div className="flex items-center gap-2 mb-4">
            <Switch 
              checked={isCustomizationEnabled}
              onCheckedChange={onToggleCustomization}
              className="data-[state=checked]:bg-[#4F46E5]" 
            />
            <span className="text-sm">Enable customization of questions to be sent to customer</span>
          </div>
          <Button 
            variant="outline" 
            onClick={handleAddSection}
            disabled={!isCustomizationEnabled}
            className="border-dashed border-2 w-full justify-center py-6 text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add a new group
          </Button>
        </div>

        {isCustomizationEnabled && sections.length > 0 && (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.id} className="border rounded-lg">
                <div className="p-4 space-y-4">
                  {/* Section Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium">Edit your title</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteSection(section.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Editable Title */}
                  <div className="relative">
                    {editingSectionId === section.id ? (
                      <Input 
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onBlur={() => handleEditSave(section.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleEditSave(section.id);
                          }
                        }}
                        className="pr-10"
                        autoFocus
                      />
                    ) : (
                      <div className="relative">
                        <Input 
                          value={section.title}
                          className="pr-10"
                          readOnly
                          onClick={() => startEditing(section)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                          onClick={() => startEditing(section)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Questions Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">Order your question</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddQuestion(section.id)}
                        className="h-8"
                      >
                        <PlusCircle className="h-3 w-3 mr-1" />
                        Add Question
                      </Button>
                    </div>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                      modifiers={[restrictToVerticalAxis]}
                    >
                      <SortableContext 
                        items={questions.filter(q => q.sectionId === section.id).map(q => q.id)} 
                        strategy={verticalListSortingStrategy}
                      >
                        {questions.filter(q => q.sectionId === section.id).map((question) => (
                          <SortableItem key={question.id} id={question.id}>
                            {editingQuestionId === question.id ? (
                              <Input
                                value={editingQuestionValue}
                                onChange={(e) => setEditingQuestionValue(e.target.value)}
                                onBlur={() => handleEditQuestion(question.id, editingQuestionValue)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleEditQuestion(question.id, editingQuestionValue);
                                  }
                                }}
                                className="flex-grow"
                                autoFocus
                              />
                            ) : (
                              <span className="flex-grow text-sm">{question.value}</span>
                            )}
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-40 p-1">
                                <div className="flex flex-col gap-1">
                                  <Button 
                                    variant="ghost" 
                                    className="flex items-center gap-2 w-full justify-start px-2 py-1.5 h-8"
                                    onClick={() => {
                                      setEditingQuestionId(question.id)
                                      setEditingQuestionValue(question.value)
                                    }}
                                  >
                                    <Pencil className="h-4 w-4" />
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    className="flex items-center gap-2 w-full justify-start px-2 py-1.5 h-8 text-red-600 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </SortableItem>
                        ))}
                      </SortableContext>
                    </DndContext>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

