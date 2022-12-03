import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import argon2 from 'argon2'
import prisma from '../../../services/db'

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
    const { name, password, email, nip, role, currentPassword } = req.body

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

    if (currentPassword) {
      let passwordHash

      try {
        const existUser = await prisma.user.findUnique({
          where: {
            id: Number(id)
          }
        })

        const isValid = await argon2.verify(existUser.password, currentPassword)

        console.log('valid: ', isValid)

        if (!isValid) {
          return res.status(400).json({ message: 'Password is incorrect' })
        }

        passwordHash = await argon2.hash(password)

        const user = await prisma.user.update({
          where: {
            id: Number(id)
          },
          data: {
            password: passwordHash
          }
        })
      } catch (error) {
        if (error) {
          return res.status(400).json({ message: error.message })
        }

        return res.status(500).json({ message: error.message })
      }
    }

    let passwordHash

    const currentUser = await prisma.user.findUnique({
      where: {
        id: Number(id)
      }
    })

    const data = {
      name,
      nip
    }

    if (currentUser.email == email) {
      data.email = email
    }

    if (currentUser.nip == nip) {
      data.nip = nip
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

      return res.status(200).json(user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(error)

          return res.status(400).json({ message: 'Email or NIP already exists' })
        }

        console.log(error)

        return res.status(400).json({ message: error.message })
      }

      console.log(error)

      return res.status(500).json({ message: error.message })
    }
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

      console.log(err)

      return res.status(500).json({ message: 'Something went wrong' })
    }
  }
}
