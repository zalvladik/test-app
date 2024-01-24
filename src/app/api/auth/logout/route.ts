import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

import { UserModel } from 'src/lib/models/user'
import { connectDbPromise } from 'src/lib/mongo'

export async function PUT(req: NextRequest) {
  const { userId } = await req.json()
  await connectDbPromise

  const logoutUser = await UserModel.findByIdAndUpdate(userId, { token: '' })

  if (!logoutUser) {
    return NextResponse.json({ error: 'user not found' }, { status: 404 })
  }

  return NextResponse.json({ status: 200 })
}
