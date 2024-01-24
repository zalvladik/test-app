import mongoose, { Schema } from 'mongoose'

import type { Model, Document } from 'mongoose'

interface User {
  userName: string
  password: string
  calendarId?: string
  token?: string
}

const UserSchema = new Schema<User & Document>(
  {
    userName: {
      type: String,
      required: [true, 'Set username'],
    },
    password: {
      type: String,
      required: [true, 'Set password'],
    },
    calendarId: {
      type: String,
      default: '',
    },
    token: String,
  },
  { versionKey: false },
)

const UserModel: Model<User & Document> =
  mongoose.models.users || mongoose.model<User>('users', UserSchema)

export { UserModel }
