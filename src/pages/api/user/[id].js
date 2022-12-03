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
    const { role } = req.body

    if (role) {
      try {
        const user = await prisma.user.update({
          where: {
            id: Number(id)
          },
          data: {
            role: role
          }
        })

        return res.status(200).json(user)
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          return res.status(400).json({ message: error.message })
        }

        return res.status(500).json({ message: error.message })
      }
    }

    let passwordHash

    const data = {
      name,
      nip
    }

    if (password) {
      passwordHash = await argon2.hash(password)
      data.password = passwordHash
    }

    try {
      const user = await prisma.user.update({
        where: {
          id: Number(id)
        },
        data
      })
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return res.status(400).json({ message: 'NIP already exists' })
        }
      }
    }

    return res.json(user)
  } else if (req.method === 'DELETE') {
    console.log(id)
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

      console.log(err)

      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}
