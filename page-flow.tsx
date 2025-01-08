'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PlusCircle, GripVertical, Settings2, Copy, MoreVertical, Pencil, Trash2, Book, Users, MessageCircle, ChevronLeft } from 'lucide-react'
import { AddCarriersDialog } from './components/add-carriers-dialog'
import { TabsNavigation } from './components/tabs-navigation'
import { PageHeader } from './components/page-header'
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { AddQuestionDialog, type QuestionData } from './components/add-question-dialog'
import { RightColumn } from './components/right-column'
import Image from 'next/image'
import { CSS } from '@dnd-kit/utilities'

function SortableItem({ id, children, switchElement }) {
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
  };

  return (
    <div style={style} className={`${isDragging ? 'opacity-50' : ''}`}>
      <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
        <span className="flex items-center gap-2">
          <span ref={setNodeRef} {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
          </span>
          {children}
        </span>
        {switchElement}
      </div>
    </div>
  );
}

const tabs = [
  { value: 'auto-reply', label: 'Auto Reply' },
  { value: 'chatbot-settings', label: 'Chatbot Settings' },
  { value: 'rebuttals', label: 'Rebuttals' },
]

const navItems = [
  {
    icon: <Book className="w-5 h-5" />,
    label: 'Page Flow',
    href: '#',
    active: true
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: 'Simple CRM',
    href: '#'
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: 'Omni Chat',
    href: '#'
  }
]

export default function PageFlow() {
  const [activeTab, setActiveTab] = React.useState('auto-reply')
  const [items, setItems] = React.useState([
    { id: 'aca-health', name: 'ACA Health' },
    { id: 'dental', name: 'Dental' },
    { id: 'final-expense', name: 'Final Expense' },
  ])
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [selectedCarriers, setSelectedCarriers] = React.useState<string[]>([])
  const carriers = [
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const [addQuestionOpen, setAddQuestionOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string | null>(null)
  const [activeItem, setActiveItem] = React.useState(items[0].id)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const handleAddQuestion = (questionData: QuestionData) => {
    console.log('Adding question to section:', activeSection, questionData)
    // Here you would typically update your state with the new question
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'auto-reply':
        return (
          <div className="flex gap-6">
            {/* Left Column */}
            <div className="w-[400px] space-y-6">
              <Card className="p-4">
                <h3 className="font-medium mb-4">Conversation auto reply</h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <SortableItem 
                          key={item.id} 
                          id={item.id}
                          switchElement={
                            <Switch
                              checked={item.id === activeItem}
                              onCheckedChange={() => setActiveItem(item.id)}
                              className="data-[state=checked]:bg-[#4F46E5]"
                            />
                          }
                        >
                          {item.name}
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
              title={items.find(item => item.id === activeItem)?.name || 'Final Expense'}
              onOpenCarriersDialog={() => setDialogOpen(true)}
              selectedCarriers={selectedCarriers.map(id => ({
                id,
                name: carriers.find(c => c.id === id)?.name || id
              }))}
              onAddQuestion={(section) => {
                setActiveSection(section)
                setAddQuestionOpen(true)
              }}
            />
          </div>
        )
      case 'chatbot-settings':
        return (
          <div className="text-center py-8 text-muted-foreground">
            Chatbot Settings content coming soon
          </div>
        )
      case 'rebuttals':
        return (
          <div className="text-center py-8 text-muted-foreground">
            Rebuttals content coming soon
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`bg-[#312E81] text-white transition-all duration-300 ${
        isCollapsed ? 'w-[60px]' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-white/10">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="Agentsly.ai"
                  width={140}
                  height={24}
                  className="flex-shrink-0"
                />
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ChevronLeft className={`h-5 w-5 transition-transform ${
                isCollapsed ? 'rotate-180' : ''
              }`} />
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-2 py-4">
            {!isCollapsed && (
              <div className="mb-2 px-2">
                <h2 className="text-xs font-semibold text-white/70">SHAREABLE PAGE</h2>
              </div>
            )}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition-colors ${
                    item.active ? 'bg-white/10' : ''
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </a>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-2 mt-auto">
            <a
              href="#"
              className={`flex items-center gap-3 px-2 py-2 rounded-md hover:bg-white/10 transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <Settings2 className="h-5 w-5" />
              {!isCollapsed && <span>Account Settings</span>}
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <PageHeader title="Page Flow" />
        <div className="border-b">
          <div className="px-6">
            <TabsNavigation
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
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

