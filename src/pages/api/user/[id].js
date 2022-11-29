import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import argon2 from 'argon2'
import prisma from '../../db'

export default async function handle(req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!user) {
      

      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } else if (req.method === 'PUT') {
    const { name, password, nip } = req.body
    let passwordHash

    const data = {
      name,
      nip
    }

    if (password) {
      passwordHash = await argon2.hash(password)
      data.password = passwordHash
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data
    })

    

    return res.json(user)
  } else if (req.method === 'DELETE') {
    try {
      const user = await prisma.user.delete({
        where: {
          id: Number(id)
        }
      })

      

      return res.status(200).json({ status: true, message: 'User deleted' })
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          

          return res.status(404).json({ message: 'User not found' })
        }
      }

      

      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}
