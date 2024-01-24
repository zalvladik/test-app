'use client'

import React from 'react'

import type { EventParamsT } from 'src/types'

import CrossIcon from 'src/components/Icons/CrossIcon'
import { useCalendarEvent } from 'src/components/CalendarEvent/useCalendarEvent'

import styles from 'src/components/CalendarEvent/styles.module.scss'

const CalendarEvent = ({
  crosses = [],
  duration,
  spacing,
  start,
  title,
  _id,
}: EventParamsT): JSX.Element => {
  const { spacingMap, deleteEventfun } = useCalendarEvent(_id)

  return (
    <div
      className={styles.event}
      style={{
        right: spacingMap(crosses.length, spacing),
        top: `${start * 2.5}px`,
        height: `${duration * 2.5}px`,
        width: `${200 / (crosses.length + 1)}px`,
      }}
    >
      <div onClick={deleteEventfun}>
        <CrossIcon />
      </div>
      {title}
    </div>
  )
}

export default CalendarEvent
