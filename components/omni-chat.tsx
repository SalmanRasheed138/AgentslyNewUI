'use client'

import * as React from 'react'
import { Search, Bot, Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PageHeader } from './page-header'

interface ChatMessage {
  type: 'ai' | 'user'
  content: string | React.ReactNode
  timestamp?: string
}

interface ChatPreview {
  id: string
  name: string
  message: string
  timestamp: string
  date: 'Today' | 'Sun'
}

export function OmniChat() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [newMessage, setNewMessage] = React.useState('')
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      type: 'ai',
      content: (
        <div className="space-y-3">
          <p>
            Hi there! My name is Friendly AI (Agentsly AI) AI assistant. Agentsly AI is a licensed healthcare insurance agent (NPN: ). Whether you're exploring healthcare options or need expert advice, I'm here to help you find the best plan tailored to your needs.
          </p>
          <p>
            Feel free to reach out via email at <span className="font-medium">agentsly.ai@gmail.com</span> or give me a call at <span className="font-medium">+1 201-555-1234</span>.
          </p>
          <p>
            To get started, could you please share your zip code, yearly salary, and age? I'll then be able to recommend the perfect healthcare plan for you!
          </p>
        </div>
      )
    },
    {
      type: 'user',
      content: (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span className="font-medium">Name</span>
          </div>
          <p>76520, 22K, 37</p>
        </div>
      )
    },
    {
      type: 'ai',
      content: (
        <div className="space-y-4">
          <p>
            Hi Jane, thank you so much for your patience. I've found a few healthcare plans that match your needs in the 76520 area:
          </p>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-medium">1. UHC Bronze Virtual First by UnitedHealthcare</p>
              <p className="italic">
                Unlimited $0 app-based care, $3 tier 2 prescriptions, and $0 insulin. It's a great option if you're looking for affordable virtual care.
              </p>
              <div className="space-y-1">
                <p><span className="font-medium">Deductible:</span> $7,250</p>
                <p><span className="font-medium">Out-of-Pocket Limit:</span> $9,450</p>
                <p><span className="font-medium">Primary Care Visits:</span> $0 copay in-network</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-medium">2. UHC Bronze Standard by UnitedHealthcare</p>
              <p className="italic">
                Easier access to specialist visits with a $50 copay and no referrals
              </p>
            </div>
          </div>
        </div>
      )
    }
  ])

  const chatPreviews: ChatPreview[] = Array.from({ length: 10 }, (_, i) => ({
    id: `chat-${i}`,
    name: 'Rovic Villaralvo',
    message: 'Customer: Some customer message',
    timestamp: '11:16am',
    date: i < 5 ? 'Today' : 'Sun'
  }))

  const filteredChatPreviews = chatPreviews.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.message.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    // Add user message
    setMessages(prev => [...prev, {
      type: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString()
    }])

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'ai',
        content: `Thank you for your message. I'll help you with: "${newMessage}"`,
        timestamp: new Date().toLocaleTimeString()
      }])
    }, 1000)

    setNewMessage('')
  }

  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div>
      <PageHeader title="Omni Chat" className="h-14" />
      <div className="p-4 sm:p-6 flex-1 gap-4 md:gap-6 flex flex-col lg:flex-row">
        {/* Search Column */}
        <Card className="lg:w-[400px] flex flex-col h-[300px] lg:h-auto">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold">Chats</h2>
          </CardHeader>
          <div className="px-4 md:px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search message" 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <CardContent className="flex-1 overflow-auto px-0">
            {['Today', 'Sun'].map(date => (
              <div key={date}>
                <div className="px-4 md:px-6 py-2 text-sm font-medium text-muted-foreground">
                  {date}
                </div>
                {filteredChatPreviews
                  .filter(chat => chat.date === date)
                  .map(chat => (
                    <div
                      key={chat.id}
                      className="flex items-center gap-3 px-4 md:px-6 py-3 hover:bg-muted/50 cursor-pointer"
                    >
                      <Avatar className="h-8 w-8 bg-blue-100">
                        <AvatarFallback className="text-blue-700">RV</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium truncate">{chat.name}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {chat.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.message}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Messaging Column */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <h2 className="text-lg font-medium">Rovic Villaralvo</h2>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-4 md:p-6">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-sm",
                    message.type === 'ai' ? "bg-muted/50 rounded-lg p-4" : "px-4"
                  )}
                >
                  {message.content}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <div className="p-4 md:p-6 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input 
                placeholder="Type your question here"
                className="flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-[#4F46E5] hover:bg-[#4F46E5]/90"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

