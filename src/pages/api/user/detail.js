import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    if (!token) {
      console.log(token)
      
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = {
      name: token.name,
      role: token.role
    }

    return res.status(200).json(user)
  }
}
