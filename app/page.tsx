'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUp } from 'lucide-react'
import { LandingLayout } from "@/components/landing-layout"
import { ChatMessage } from '@/components/chat-message'
import { addMessage, setIsTyping } from '@/lib/slices/chatSlice'
import { RootState } from '@/lib/store'

const quickActions = [
  "How can I contact the agent?",
  "What is ACA",
  "What is Agentsly?",
  "How can you give me a quote?",
  "I don't know where to start"
]

export default function LandingPage() {
  const dispatch = useDispatch()
  const messages = useSelector((state: RootState) => state.chat.messages)
  const isTyping = useSelector((state: RootState) => state.chat.isTyping)
  const chatStarted = useSelector((state: RootState) => state.chat.chatStarted)
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    dispatch(addMessage({
      type: 'user',
      content: input
    }))

    // Clear input
    setInput('')

    // Show typing indicator
    dispatch(setIsTyping(true))

    // Simulate AI response
    setTimeout(() => {
      dispatch(setIsTyping(false))
      if (input.includes('76520') && input.includes('22K') && input.includes('37')) {
        dispatch(addMessage({
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
                    Easier access to specialist visits with a $50 copay and no referrals needed
                  </p>
                </div>
              </div>
            </div>
          )
        }))
      } else {
        dispatch(addMessage({
          type: 'ai',
          content: "I'll help you with that. Could you please provide more information?"
        }))
      }
    }, 1000)
  }

  return (
    <LandingLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[calc(100vh-8rem)] flex flex-col">
        {!chatStarted && (
          <div className="flex-1 flex flex-col items-center justify-center text-center mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-4">
              Hi, I'm your assistant agent Shawn,
            </h1>
            <p className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
              What can I help you with?
            </p>
          </div>
        )}
        
        <div className={`flex-1 overflow-y-auto space-y-6 mb-6 ${chatStarted ? 'block' : 'hidden'}`}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              type={message.type}
              content={message.content}
            />
          ))}
          {isTyping && (
            <div className="text-sm text-gray-500">AI is typing...</div>
          )}
        </div>

        <div className="space-y-6">
          {!chatStarted && (
            <>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-sm">✨</span>
                <span className="text-sm text-muted-foreground">You can start with</span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="rounded-full text-sm sm:text-base py-2 h-auto"
                    onClick={() => setInput(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here"
              className="w-full pl-4 pr-12 py-4 sm:py-6 text-base sm:text-lg rounded-xl"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6C5CE7] hover:bg-[#6C5CE7]/90 text-white"
              disabled={!input.trim()}
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </LandingLayout>
  )
}

