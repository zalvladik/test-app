import jwt from 'jsonwebtoken'

import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { JwtPayload } from 'jsonwebtoken'

import { UserModel } from 'src/lib/models/user'

import { connectDbPromise } from 'src/lib/mongo'

const KEY = process.env.SECRET_KEY

export async function checkTokenValidity(req: NextRequest) {
  const token = req.headers?.get('authorization')?.split('Bearer ')[1]

  await connectDbPromise

  if (!token) {
    return NextResponse.json({ message: 'not auth' }, { status: 401 })
  }

  try {
    const { id } = jwt.verify(token, KEY!) as JwtPayload
    const isValidToken = await UserModel.findById(id)

    if (!isValidToken) {
      return NextResponse.json({ message: 'not auth' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ message: 'not auth' }, { status: 401 })
  }

  return null
}
