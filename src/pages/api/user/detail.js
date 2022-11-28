import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

export default async function handle(req, res) {
  const prisma = new PrismaClient()
  if (req.method === 'GET') {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        nip: true,
        role: true,
        password: false,
      },
      where: {
        email: token.email
      },
    })

    prisma.$disconnect()

    return res.status(200).json(user)
  }
}
