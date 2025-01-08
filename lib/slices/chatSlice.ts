import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Message {
  id: string
  type: 'ai' | 'user'
  content: string
  timestamp: string
}

interface ChatState {
  messages: Message[]
  isTyping: boolean
  chatStarted: boolean
}

const initialState: ChatState = {
  messages: [
    {
      id: '1',
      type: 'ai',
      content: `
        Hi there! My name is Friendly AI (Agentsly AI) AI assistant. Agentsly AI is a licensed healthcare insurance agent (NPN: ). Whether you're exploring healthcare options or need expert advice, I'm here to help you find the best plan tailored to your needs.

        Feel free to reach out via email at agentsly.ai@gmail.com or give me a call at +1 201-555-1234.

        To get started, could you please share your zip code, yearly salary, and age? I'll then be able to recommend the perfect healthcare plan for you!
      `,
      timestamp: new Date().toISOString()
    }
  ],
  isTyping: false,
  chatStarted: false
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id' | 'timestamp'>>) => {
      state.messages.push({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload
      })
      state.chatStarted = true
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload
    }
  }
})

export const { addMessage, setIsTyping } = chatSlice.actions
export default chatSlice.reducer

