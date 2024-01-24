import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { UserModel } from 'src/lib/models/user'
import { connectDbPromise } from 'src/lib/mongo'

const KEY = process.env.SECRET_KEY

export async function PUT(req: NextRequest) {
  const { userName, password } = await req.json()
  await connectDbPromise

  const user = await UserModel.findOne({ userName })

  if (!user) {
    return NextResponse.json({ error: 'user not foune' }, { status: 404 })
  }

  const passwordCompare = await bcrypt.compare(password, user.password)

  if (!passwordCompare) {
    return NextResponse.json({ error: 'invalid password' }, { status: 401 })
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    KEY!,
    { expiresIn: '23h' },
  )

  await UserModel.findByIdAndUpdate(user._id, { token })

  const response = {
    calendarId: user.calendarId,
    userId: user._id,
    userName,
    token,
  }

  return NextResponse.json(response, { status: 200 })
}
