import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const { method } = req

  const prisma = new PrismaClient()

  if (method === 'GET') {
    const tasks = await prisma.task.findMany()
    if (!tasks) {
      prisma.$disconnect()

      return res.status(400).json({ success: false })
    }

    prisma.$disconnect()

    return res.status(200).json({ success: true, data: tasks })
  }

  if (method === 'POST') {
    const { title, duedate, priority, description, status, taskfile, projectId, penanggungJawabId } = req.body

    try {
      const task = await prisma.task.create({
        data: {
          title,
          duedate,
          priority: Number(priority),
          description,
          status: Number(status),
          taskfile,
          projectId: Number(projectId),
          penanggungJawabId: Number(penanggungJawabId)
        }
      })

      prisma.$disconnect()

      return res.status(201).json({ success: true, data: task })
    } catch (error) {
      prisma.$disconnect()
      console.log(error)

      return res.status(400).json({ success: false })
    }
  }
}
