import { createAsyncThunk } from '@reduxjs/toolkit'

import type { CalendarProps } from 'src/types'
import type { DeleteEventProps } from 'src/redux/types'

export const getAllEvents = createAsyncThunk('events/getAll', async (id: string) => {
  const userToken = localStorage.getItem('userToken') || ''
  const response = await fetch(`/api/calendar?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  })

  if (!response.ok) throw new Error('Unable to fetch calendar')

  return response.json()
})

export const postEvent = createAsyncThunk(
  'events/post',
  async (data: CalendarProps) => {
    const userToken = localStorage.getItem('userToken') || ''
    const response = await fetch(`/api/calendar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) throw new Error('Unable to fetch calendar')

    return response.json()
  },
)

export const deleteEvent = createAsyncThunk(
  'events/delete',
  async ({ calendarId, eventId }: DeleteEventProps) => {
    const userToken = localStorage.getItem('userToken') || ''
    const response = await fetch(
      `/api/calendar?calendarId=${calendarId}&eventId=${eventId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      },
    )

    if (!response.ok) throw new Error('Unable to fetch calendar')

    return response.json()
  },
)
