import prisma from '../../db'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime'
import argon2 from 'argon2'

export default async function handle(req, res) {
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

      return res.status(200).json(user)
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          

          return res.status(400).json({ message: 'Email or NIP already in use' })
        }
      }

      if (err instanceof PrismaClientValidationError) {
        

        return res.status(400).json({ message: 'Validation error' })
      }

      

      return res.status(500).json({ message: 'Something went wrong' })
    }
  } else if (req.method === 'GET') {
    const users = await prisma.user.findMany()

    

    return res.status(200).json(users)
  }
}
