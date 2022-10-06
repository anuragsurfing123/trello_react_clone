import { configureStore } from '@reduxjs/toolkit'
import trelloReducer from './features/trello/trelloSlices'

export const store = configureStore({
  reducer: {
    trello:trelloReducer,
  },
})