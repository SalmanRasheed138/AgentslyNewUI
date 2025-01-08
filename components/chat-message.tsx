import { Bot } from 'lucide-react'

interface ChatMessageProps {
  type: 'ai' | 'user'
  content: string | React.ReactNode
  className?: string
}

export function ChatMessage({ type, content, className = '' }: ChatMessageProps) {
  if (type === 'ai') {
    return (
      <div className={`flex gap-3 ${className}`}>
        <div className="flex-shrink-0 w-6 h-6">
          <Bot className="w-full h-full text-[#6C5CE7]" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="font-medium">Name</div>
          <div className="text-gray-600 leading-relaxed">{content}</div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex justify-end ${className}`}>
      <div className="max-w-[80%] bg-gray-100 rounded-lg px-4 py-2 text-gray-600">
        {content}
      </div>
    </div>
  )
}

