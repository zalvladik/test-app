import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'

import eventReducer from 'src/redux/features/event-slice'
import authReducer from 'src/redux/features/auth-slice'

export const store = configureStore({
  reducer: {
    eventReducer,
    authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
