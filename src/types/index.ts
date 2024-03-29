export type HourseParserT = {
  start: string
  end: string
  title: string
}

export type AuthT = {
  userName: string
  password: string
}

export type CalendarProps = {
  start: number
  duration: number
  title: string
  calendarId?: string
}

export type EventParamsT = {
  _id: string
  start: number
  duration: number
  title: string
  crosses: string[]
  spacing: number
}

export type EventResponseT = {
  _id: string
  start: number
  duration: number
  title: string
}
