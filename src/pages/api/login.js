import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import Gmail from 'src/services/Gmail'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    const passwordValid = await argon2.verify(user.password, password)

    if (!passwordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    let token = jwt.sign(
      {
        uid: user.id,
        name: user.name,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
      },
      process.env.JWT_SECRET,
      { algorithm: 'HS256' }
    )

    return res.status(200).json({ message: 'Logged in successfully', token: token })
  }
}
