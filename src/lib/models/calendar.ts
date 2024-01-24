import mongoose, { Schema, model } from 'mongoose'

import type { Model, Document } from 'mongoose'

interface Events {
  start: number
  duration: number
  title: string
}

type Calendar = {
  events: Events[]
}

const CalendarSchema = new Schema<Calendar & Document>({
  events: [
    {
      start: {
        type: Number,
        required: [true, 'Set start for event'],
      },
      duration: {
        type: Number,
        required: [true, 'Set duration for event'],
      },
      title: {
        type: String,
        required: [true, 'Set title for event'],
      },
    },
  ],
})

export const CalendarModel: Model<Calendar & Document> =
  mongoose.models.calendars || model<Calendar>('calendars', CalendarSchema)
