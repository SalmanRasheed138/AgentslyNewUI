'use client'

import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Copy, GripVertical } from 'lucide-react'
import { AddCarriersDialog } from './add-carriers-dialog'
import { TabsNavigation } from './tabs-navigation'
import { PageHeader } from './page-header'
import { AddQuestionDialog, type QuestionData } from './add-question-dialog'
import { RightColumn } from './right-column'
import { ChatbotSettings } from './chatbot-settings'
import { Rebuttals } from './rebuttals'
import { RootState } from '@/lib/store'
import { setActiveTab } from '@/lib/slices/tabsSlice'
import { setActiveSection } from '@/lib/slices/sectionsSlice'
import { addQuestion } from '@/lib/slices/questionsSlice'
import { setActiveAutoReplyItem, reorderAutoReplyItems, toggleCustomization, toggleAutoReplyItem } from '@/lib/slices/autoReplySlice'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div ref={setNodeRef} style={style} className={`${isDragging ? 'opacity-70 bg-gray-100' : ''}`}>
      <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 border border-transparent hover:border-gray-200">
        <span className="flex items-center gap-2">
          <span {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </span>
          {children[0]}
        </span>
        {children[1]}
      </div>
    </div>
  );
}

export default function PageFlow() {
  const dispatch = useDispatch()
  const { activeTab, tabs } = useSelector((state: RootState) => state.tabs)
  const { sections, activeSection } = useSelector((state: RootState) => state.sections)
  const { questions } = useSelector((state: RootState) => state.questions)
  const { items, activeItemId, isCustomizationEnabled } = useSelector((state: RootState) => state.autoReply)

  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedCarriers, setSelectedCarriers] = React.useState<string[]>([])
  const [addQuestionOpen, setAddQuestionOpen] = React.useState(false)


  const handleSwitchChange = (id: string) => {
    dispatch(setActiveAutoReplyItem(id));
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleAddQuestion = (questionData: QuestionData) => {
    if (activeSection) {
      dispatch(addQuestion({
        id: `question-${Date.now()}`,
        sectionId: activeSection,
        value: questionData.label,
      }))
    }
    setAddQuestionOpen(false)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      dispatch(reorderAutoReplyItems(newOrder.map(item => item.id)));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'auto-reply':
        return (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="w-full lg:w-[400px] space-y-6">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Conversation auto reply</h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                          <span className="flex-grow">{item.name}</span>
                          <Switch
                            checked={item.id === activeItemId}
                            onCheckedChange={() => handleSwitchChange(item.id)}
                            className="data-[state=checked]:bg-[#4F46E5]"
                          />
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">URL Settings</h3>
                  <Button variant="secondary" size="sm">Save</Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Shareable Link URL</label>
                    <Input placeholder="Value" className="mt-1" />
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">Shareable page preview</span>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <RightColumn
              title={items.find(item => item.id === activeItemId)?.name || 'No active item'}
              onOpenCarriersDialog={() => setDialogOpen(true)}
              selectedCarriers={selectedCarriers.map(id => ({
                id,
                name: id // This should be replaced with actual carrier names in a real application
              }))}
              onAddQuestion={(sectionId) => {
                dispatch(setActiveSection(sectionId))
                setAddQuestionOpen(true)
              }}
              sections={sections}
              questions={questions}
              isCustomizationEnabled={isCustomizationEnabled}
              onToggleCustomization={() => dispatch(toggleCustomization())}
            />
          </div>
        )
      case 'chatbot-settings':
        return <ChatbotSettings />
      case 'rebuttals':
        return <Rebuttals />
      default:
        return null
    }
  }

  return (
    <div>
      <PageHeader title="Page Flow" />
      <div className="border-b">
        <div className="px-4 sm:px-6">
          <TabsNavigation
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(value) => dispatch(setActiveTab(value))}
          />
        </div>
      </div>
      <div className="p-4 sm:p-6">
        {renderTabContent()}
      </div>

      <AddCarriersDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={setSelectedCarriers}
        initialSelected={selectedCarriers}
      />

      <AddQuestionDialog
        open={addQuestionOpen}
        onOpenChange={setAddQuestionOpen}
        onSave={handleAddQuestion}
      />
    </div>
  )
}

