'use client'

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

import CalendarEvent from 'src/components/CalendarEvent'
import CalendarHourse from 'src/components/CalendarHourse'
import CreateEventForm from 'src/components/CreateEventForm'

import { getAllEvents } from 'src/redux/services/event-operations'
import { useCalendarPage } from 'src/app/calendar/useCalendarPage'
import { ROUTES } from 'src/lib/routes'

import styles from 'src/app/calendar/styles.module.scss'

const Page = (): JSX.Element => {
  const { eventPosition, calendarId, dispatch } = useCalendarPage()

  if (!calendarId) {
    redirect(ROUTES.AUTH_LOGIN)
  }

  useEffect(() => {
    if (calendarId) {
      dispatch(getAllEvents(calendarId))
    }
  }, [calendarId])

  return (
    <section className={styles.calendar_section}>
      <div className={styles.event_container}>
        <CalendarHourse />

        {eventPosition.map(item => (
          <CalendarEvent key={item._id} {...item} />
        ))}
      </div>

      <CreateEventForm calendarId={calendarId} />
    </section>
  )
}

export default Page
