import prisma from '../../db'

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const tasks = await prisma.task.findMany()
    if (!tasks) {
      

      return res.status(400).json({ success: false })
    }

    

    return res.status(200).json({ success: true, data: tasks })
  }

  if (method === 'POST') {
    const { title, duedate, priority, description, status, taskfile, projectId, userId } = req.body

    try {
      const task = await prisma.task.create({
        data: {
          title,
          duedate,
          priority: Number(priority),
          description,
          status: Number(status),
          taskfile: '',
          projectId: Number(projectId),
          userId: Number(userId)
        }
      })

      

      return res.status(201).json({ success: true, data: task })
    } catch (error) {
      
      console.log(error)

      return res.status(400).json({ success: false })
    }
  }
}
