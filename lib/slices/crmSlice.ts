import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CRMState {
  activeTab: 'customer' | 'analytics'
}

const initialState: CRMState = {
  activeTab: 'analytics'
}

const crmSlice = createSlice({
  name: 'crm',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'customer' | 'analytics'>) => {
      state.activeTab = action.payload
    }
  }
})

export const { setActiveTab } = crmSlice.actions
export default crmSlice.reducer

