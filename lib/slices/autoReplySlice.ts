import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AutoReplyItem {
  id: string
  name: string
}

interface AutoReplyState {
  items: AutoReplyItem[]
  activeItemId: string
  isCustomizationEnabled: boolean
}

const initialState: AutoReplyState = {
  items: [
    { id: 'aca-health', name: 'ACA Health' },
    { id: 'dental', name: 'Dental' },
    { id: 'final-expense', name: 'Final Expense' },
  ],
  activeItemId: 'aca-health',
  isCustomizationEnabled: false
}

const autoReplySlice = createSlice({
  name: 'autoReply',
  initialState,
  reducers: {
    toggleAutoReplyItem: (state, action: PayloadAction<string>) => {
      state.activeItemId = action.payload;
    },
    toggleCustomization: (state) => {
      state.isCustomizationEnabled = !state.isCustomizationEnabled
    },
    reorderAutoReplyItems: (state, action: PayloadAction<string[]>) => {
      const newOrder = action.payload;
      state.items = newOrder.map(id => state.items.find(item => item.id === id)!);
    },
    setActiveAutoReplyItem: (state, action: PayloadAction<string>) => {
      state.activeItemId = action.payload;
    },
  }
})

export const { toggleAutoReplyItem, toggleCustomization, reorderAutoReplyItems, setActiveAutoReplyItem } = autoReplySlice.actions
export default autoReplySlice.reducer

