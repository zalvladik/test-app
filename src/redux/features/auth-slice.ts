/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit'

import { goodToast, badToast } from 'src/lib/toastify'
import {
  authLogin,
  authLogout,
  authRefresh,
  authRegistration,
} from 'src/redux/services/auth-operations'

type State = {
  calendarId: string
  isLoading: boolean
  userName: string
  userId: string
  token: string
}

const initialState: State = {
  calendarId: '',
  isLoading: false,
  userName: '',
  userId: '',
  token: '',
}

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authRegistration.pending, state => {
        state.isLoading = true
      })
      .addCase(authRegistration.fulfilled, state => {
        state.isLoading = false
        goodToast('Registration fulfilled!')
      })
      .addCase(authRegistration.rejected, (state, action) => {
        state.isLoading = false
        badToast(action.error.message || 'error')
      })
      .addCase(authLogin.pending, state => {
        state.isLoading = true
      })
      .addCase(authLogin.fulfilled, (_, action) => {
        goodToast('Login fulfilled!')
        localStorage.setItem('userToken', action.payload.token)

        return { isLoading: false, ...action.payload }
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.isLoading = false
        badToast(action.error.message || 'error')
      })
      .addCase(authLogout.pending, state => {
        state.isLoading = true
      })
      .addCase(authLogout.fulfilled, state => {
        localStorage.removeItem('userToken')
        goodToast('You logout!')
        state.calendarId = ''
        state.isLoading = false
        state.userName = ''
        state.userId = ''
        state.token = ''
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.isLoading = false
        badToast(action.error.message || 'error')
      })
      .addCase(authRefresh.pending, state => {
        state.isLoading = true
      })
      .addCase(authRefresh.fulfilled, (_, action) => {
        return { isLoading: false, ...action.payload }
      })
      .addCase(authRefresh.rejected, (state, action) => {
        state.isLoading = false
        badToast(action.error.message || 'error')
      })
  },
})

export default auth.reducer
