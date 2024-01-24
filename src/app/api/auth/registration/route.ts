import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import type { NextRequest } from 'next/server'

import { UserModel } from 'src/lib/models/user'
import { connectDbPromise } from 'src/lib/mongo'
import { CalendarModel } from 'src/lib/models/calendar'

export async function POST(req: NextRequest) {
  const { userName, password } = await req.json()

  await connectDbPromise

  const user = await UserModel.findOne({ userName })

  if (user) return NextResponse.json({ error: 'username in use' }, { status: 409 })

  const newCalendar = new CalendarModel({
    events: [
      {
        start: 0,
        duration: 90,
        title: 'Hover me !',
      },
    ],
  })

  const savedCalendar = await newCalendar.save()

  const salt = bcrypt.genSaltSync(10)
  const hashPassword = bcrypt.hashSync(password, salt)

  const newUser = new UserModel({
    userName,
    password: hashPassword,
    calendarId: savedCalendar._id,
  })

  const savedUser = await newUser.save()

  const response = {
    calendarId: savedUser.calendarId,
    userId: savedUser._id,
    userName: savedUser.userName,
  }

  return NextResponse.json(response, { status: 200 })
}
