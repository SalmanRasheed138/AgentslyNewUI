import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from './slices/tabsSlice'
import sectionsReducer from './slices/sectionsSlice'
import questionsReducer from './slices/questionsSlice'
import autoReplyReducer from './slices/autoReplySlice'
import rebuttalReducer from './slices/rebuttalSlice'
import crmReducer from './slices/crmSlice'
import userProfileReducer from './slices/userProfileSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    sections: sectionsReducer,
    questions: questionsReducer,
    autoReply: autoReplyReducer,
    rebuttals: rebuttalReducer,
    crm: crmReducer,
    userProfile: userProfileReducer,
    chat: chatReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

