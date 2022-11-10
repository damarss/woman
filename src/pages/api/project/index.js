import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const { method } = req
  const prisma = new PrismaClient()

  if (method === 'GET') {
    const projects = await prisma.project.findMany()
    if (!projects) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: projects })
  }

  if (method === 'POST') {
    const { title, startdate, enddate, description } = req.body
    try {
      const project = await prisma.project.create({
        data: {
          title,
          startdate,
          enddate,
          description,
          isArchived: false
        }
      })

      return res.status(201).json({ success: true, data: project })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }
  }
}
