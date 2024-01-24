import { useDispatch } from 'react-redux'

import type { AppDispatch } from 'src/redux/store'

import { useAppSelector } from 'src/redux/store'
import { deleteEvent } from 'src/redux/services/event-operations'

export const useCalendarEvent = (eventId: string) => {
  const { calendarId } = useAppSelector(state => state.authReducer)
  const dispatch = useDispatch<AppDispatch>()

  const spacingMap = (crosses: number, spacing: number) => {
    const spacingMap: { [key: string]: string } = {
      '1_0': '0px',
      '1_1': '100px',
      '2_0': '0px',
      '2_1': '66.66px',
      '2_2': '133.3px',
      '3_0': '0px',
      '3_1': '50px',
      '3_2': '100px',
      '3_3': '150px',
    }

    const key = `${crosses}_${spacing}`

    return spacingMap[key] || '0px'
  }

  const deleteEventfun = (): void => {
    dispatch(deleteEvent({ calendarId, eventId }))
  }

  return {
    spacingMap,
    deleteEventfun,
  }
}
