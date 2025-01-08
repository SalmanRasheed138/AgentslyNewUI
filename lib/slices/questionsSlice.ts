import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Question {
  id: string
  sectionId: string
  value: string
}

interface QuestionsState {
  questions: Question[]
}

const initialState: QuestionsState = {
  questions: [],
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<Question>) => {
      state.questions.push(action.payload)
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter(question => question.id !== action.payload)
    },
    updateQuestion: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const index = state.questions.findIndex(question => question.id === action.payload.id)
      if (index !== -1) {
        state.questions[index].value = action.payload.value
      }
    },
    reorderQuestions: (state, action: PayloadAction<{ sectionId: string; questionIds: string[] }>) => {
      const { sectionId, questionIds } = action.payload
      const sectionQuestions = state.questions.filter(q => q.sectionId === sectionId)
      state.questions = state.questions.filter(q => q.sectionId !== sectionId)
      const reorderedQuestions = questionIds.map(id => sectionQuestions.find(q => q.id === id)!)
      state.questions.push(...reorderedQuestions)
    },
  },
})

export const { addQuestion, removeQuestion, updateQuestion, reorderQuestions } = questionsSlice.actions
export default questionsSlice.reducer

