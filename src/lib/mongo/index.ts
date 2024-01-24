/* eslint-disable */

import mongoose, { ConnectOptions, Mongoose } from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

const options = {}

let connectDbPromise: Promise<Mongoose>

if (process.env.NODE_ENV === 'development') {
  let globalMongo = global as typeof globalThis & {
    isConnected?: Promise<Mongoose>
  }

  if (!globalMongo.isConnected) {
    console.log('connecting to mongodb')
    globalMongo.isConnected = mongoose.connect(uri, options as ConnectOptions)
    console.log('connected!')
  }
  connectDbPromise = globalMongo.isConnected
} else {
  try {
    connectDbPromise = mongoose.connect(uri, options as ConnectOptions)
  } catch (err) {
    console.log(err)
  }
  connectDbPromise = mongoose.connect(uri, options as ConnectOptions)
}

export { connectDbPromise }
