import { createAsyncThunk } from '@reduxjs/toolkit'

import type { AuthT } from 'src/types'

export const authRegistration = createAsyncThunk(
  'auth/registration',
  async (data: AuthT) => {
    const response = await fetch('/api/auth/registration', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (response.status === 409) throw new Error('username in use')

    return response.json()
  },
)

export const authLogin = createAsyncThunk('auth/login', async (data: AuthT) => {
  const response = await fetch('/api/auth/login', {
    method: 'PUT',
    body: JSON.stringify(data),
  })

  if (response.status === 404) throw new Error('user not found')

  if (response.status === 401) throw new Error('invalid password')

  return response.json()
})

export const authLogout = createAsyncThunk('auth/logout', async (userId: string) => {
  const response = await fetch('/api/auth/logout', {
    method: 'PUT',
    body: JSON.stringify({ userId }),
  })

  if (response.status === 404) throw new Error('user not found')

  return response.json()
})

export const authRefresh = createAsyncThunk('auth/refresh', async () => {
  const userToken = localStorage.getItem('userToken')

  if (!userToken) {
    return {}
  }

  const response = await fetch('/api/auth/refresh', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userToken}`,
    },
  })

  if (response.status === 401) throw new Error('user not auth')

  return response.json()
})
