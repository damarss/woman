import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const secret = process.env.JWT_SECRET

export default async function handler(req, res) {
  if (req.url === '/') {
    const token = await getToken({ req, secret })

    if (!token) {
      NextResponse.rewrite('/pages/login')
    }
  }

  NextResponse.next()
}
