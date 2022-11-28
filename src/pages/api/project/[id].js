import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  const prisma = new PrismaClient()

  if (method === 'GET') {
    const project = await prisma.project.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!project) {
      prisma.$disconnect()

      return res.status(400).json({ success: false, message: 'Project not found' })
    }

    prisma.$disconnect()

    return res.status(200).json({ success: true, data: project })
  } else if (method === 'PUT') {
    const { title, startdate, enddate, description } = req.body
    const isArchived = req.body.isArchived === 'true'
    try {
      const project = await prisma.project.update({
        where: {
          id: Number(id)
        },
        data: {
          title,
          startdate,
          enddate,
          description,
          isArchived
        }
      })

      prisma.$disconnect()

      return res.status(200).json({ success: true, data: project })
    } catch (error) {
      prisma.$disconnect()
      console.log(error)

      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const project = await prisma.project.delete({
        where: {
          id: Number(id)
        }
      })

      prisma.$disconnect()

      return res.status(200).json({ success: true, message: 'Project deleted' })
    } catch (error) {
      prisma.$disconnect()
      
      return res.status(400).json({ success: false, message: 'Project not found' })
    }
  }
}
