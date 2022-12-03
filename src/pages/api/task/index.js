import prisma from '../../../services/db'
import { mailOptions, sendMailTaskAssigned } from 'src/services/sendEmail'

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

      // mail to user id
      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId)
        }
      })

      // priority 0:low 1:medium 2:high
      const priorityName = priority == 0 ? 'Low' : priority == 1 ? 'Medium' : 'High'

      mailOptions.to = user.email
      mailOptions.subject = title
      mailOptions.title = title
      mailOptions.description = description
      mailOptions.duedate = new Date(duedate).toLocaleDateString('id-ID')
      mailOptions.priority = priorityName
      mailOptions.status = status
      mailOptions.userName = user.name
      mailOptions.link = `${process.env.BASE_URL}/task-detail/${task.id}`

      sendMailTaskAssigned(mailOptions)

      return res.status(201).json({ success: true, data: task })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }
  }
}
