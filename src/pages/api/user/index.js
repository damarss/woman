import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime'
import argon2 from 'argon2'
import { getToken } from 'next-auth/jwt'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    const { email, password, name, nip } = req.body

    let passwordHash = await argon2.hash(password)

    const data = {
      email,
      password: passwordHash,
      name,
      nip
    }

    try {
      const user = await prisma.user.create({
        data
      })

      prisma.$disconnect()

      return res.status(200).json(user)
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          prisma.$disconnect()

          return res.status(400).json({ message: 'Email already in use' })
        }
      }

      if (err instanceof PrismaClientValidationError) {
        prisma.$disconnect()

        return res.status(400).json({ message: 'Validation error' })
      }

      prisma.$disconnect()

      return res.status(500).json({ message: 'Something went wrong' })
    }
  } else if (req.method === 'GET') {
    if (token.role !== 'admin') {
      prisma.$disconnect()

      return res.status(401).json({ status: 'Unauthorized' })
    }

    const users = await prisma.user.findMany()

    prisma.$disconnect()

    return res.status(200).json(users)
  }
}
