import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Rebuttal {
  id: string
  question: string
  answer: string
}

interface RebuttalState {
  rebuttals: Rebuttal[]
  editingRebuttal: Rebuttal | null
}

const initialState: RebuttalState = {
  rebuttals: [
    {
      id: '1',
      question: 'I am currently enrolled with a state insurance.',
      answer: 'I understand your satisfaction with state insurance, but the ACA offers valuable benefits like coverage for pre-existing conditions and preventive services with no out-of-pocket costs. It might be worth exploring these options in case your needs change or if you want to know all available benefits.'
    }
  ],
  editingRebuttal: null
}

const rebuttalSlice = createSlice({
  name: 'rebuttals',
  initialState,
  reducers: {
    addRebuttal: (state, action: PayloadAction<Omit<Rebuttal, 'id'>>) => {
      const newRebuttal = {
        id: `rebuttal-${Date.now()}`,
        ...action.payload
      }
      state.rebuttals.push(newRebuttal)
    },
    updateRebuttal: (state, action: PayloadAction<Rebuttal>) => {
      const index = state.rebuttals.findIndex(rebuttal => rebuttal.id === action.payload.id)
      if (index !== -1) {
        state.rebuttals[index] = action.payload
      }
      state.editingRebuttal = null
    },
    deleteRebuttal: (state, action: PayloadAction<string>) => {
      state.rebuttals = state.rebuttals.filter(rebuttal => rebuttal.id !== action.payload)
    },
    setEditingRebuttal: (state, action: PayloadAction<string | null>) => {
      state.editingRebuttal = action.payload 
        ? state.rebuttals.find(rebuttal => rebuttal.id === action.payload) || null
        : null
    }
  }
})

export const { addRebuttal, updateRebuttal, deleteRebuttal, setEditingRebuttal } = rebuttalSlice.actions
export default rebuttalSlice.reducer

