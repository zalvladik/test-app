import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

import { CalendarModel } from 'src/lib/models/calendar'

import { connectDbPromise } from 'src/lib/mongo'
import { checkTokenValidity } from 'src/app/api/calendar/middleware'

export async function GET(req: NextRequest) {
  const tokenCheckResult = await checkTokenValidity(req)

  if (tokenCheckResult) {
    return tokenCheckResult
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  await connectDbPromise
  const result = await CalendarModel.findById(id).sort({ start: 1 })

  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  const tokenCheckResult = await checkTokenValidity(req)

  if (tokenCheckResult) {
    return tokenCheckResult
  }

  const { start, duration, title, calendarId } = await req.json()
  await connectDbPromise

  const calendar = await CalendarModel.findById(calendarId)

  if (!calendar) {
    return NextResponse.json({ message: 'calendar not found' }, { status: 404 })
  }

  const newEvent = {
    start,
    duration,
    title,
  }

  calendar.events.push(newEvent)

  const updatedCalendar = await calendar.save()

  return NextResponse.json(updatedCalendar.events.slice(-1)[0])
}

export async function DELETE(req: NextRequest) {
  const tokenCheckResult = await checkTokenValidity(req)

  if (tokenCheckResult) {
    return tokenCheckResult
  }

  const { searchParams } = new URL(req.url)
  const calendarId = searchParams.get('calendarId')
  const eventId = searchParams.get('eventId')

  await connectDbPromise

  await CalendarModel.updateOne(
    { _id: calendarId, 'events._id': eventId },
    { $pull: { events: { _id: eventId } } },
  )

  return NextResponse.json(eventId)
}
