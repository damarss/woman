import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  if (token) {
    return NextResponse.redirect('/')
  }

  NextResponse.next()
}
