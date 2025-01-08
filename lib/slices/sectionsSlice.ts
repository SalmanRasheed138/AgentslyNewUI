import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Section {
  id: string
  title: string
}

interface SectionsState {
  sections: Section[]
  activeSection: string | null
}

const initialState: SectionsState = {
  sections: [],
  activeSection: null,
}

const sectionsSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    addSection: (state, action: PayloadAction<Section>) => {
      state.sections.push(action.payload)
    },
    removeSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(section => section.id !== action.payload)
    },
    updateSection: (state, action: PayloadAction<Section>) => {
      const index = state.sections.findIndex(section => section.id === action.payload.id)
      if (index !== -1) {
        state.sections[index] = action.payload
      }
    },
    setActiveSection: (state, action: PayloadAction<string | null>) => {
      state.activeSection = action.payload
    },
  },
})

export const { addSection, removeSection, updateSection, setActiveSection } = sectionsSlice.actions
export default sectionsSlice.reducer

