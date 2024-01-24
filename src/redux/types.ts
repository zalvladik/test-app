import type { EventParamsT } from 'src/types'

export type DeleteEventProps = {
  calendarId?: string
  eventId: string
}

export interface CalendarState {
  isLoading: boolean
  data: EventParamsT[]
}

export interface AuthState {
  calendarId: string
  isLoading: boolean
  userName: string
  userId: string
  token: string
}

export interface RootState {
  authReducer: AuthState
  eventReducer: CalendarState
}
