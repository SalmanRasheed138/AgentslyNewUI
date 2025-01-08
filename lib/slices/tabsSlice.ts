import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TabsState {
  activeTab: string
  tabs: { value: string; label: string }[]
}

const initialState: TabsState = {
  activeTab: 'auto-reply',
  tabs: [
    { value: 'auto-reply', label: 'Auto Reply' },
    { value: 'chatbot-settings', label: 'Chatbot Settings' },
    { value: 'rebuttals', label: 'Rebuttals' },
  ],
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload
    },
  },
})

export const { setActiveTab } = tabsSlice.actions
export default tabsSlice.reducer

