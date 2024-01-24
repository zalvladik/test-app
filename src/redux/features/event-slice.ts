/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit'

import type { EventResponseT } from 'src/types'

import { goodToast, badToast } from 'src/lib/toastify'
import {
  getAllEvents,
  deleteEvent,
  postEvent,
} from 'src/redux/services/event-operations'

type State = {
  isLoading: boolean
  data: EventResponseT[]
}

const initialState: State = {
  isLoading: false,
  data: [],
}

export const event = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllEvents.pending, state => {
        state.isLoading = true
        state.data = []
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.events
      })
      .addCase(getAllEvents.rejected, state => {
        state.isLoading = false
        badToast('error')
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.data = state.data.filter(item => item._id !== action.payload)
        goodToast('Event deleted')
      })
      .addCase(postEvent.pending, state => {
        state.isLoading = true
      })
      .addCase(postEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = [...state.data, action.payload]
        goodToast('Event added')
      })
      .addCase(postEvent.rejected, state => {
        state.isLoading = false
        badToast('error')
      })
  },
})

export default event.reducer
