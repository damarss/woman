import { getToken } from 'next-auth/jwt'
import prisma from '../../../services/db'
import { mailOptions, sendMailTaskComment } from 'src/services/sendEmail'

export default async function handle(req, res) {
  if (req.method === 'GET') {
    const comments = await prisma.taskComment.findMany({
      include: {
        User: true,
        Project: true,
        TaskComment: true
      }
    })

    res.status(200).json({ success: true, data: task })
  } else if (req.method === 'POST') {
    const { comment, taskId } = req.body
    const token = await getToken({ req, secret: process.env.JWT_SECRET })

    if (!comment) {
      return res.status(400).json({ success: false, message: 'Comment is required' })
    }

    const comments = await prisma.taskComment.create({
      data: {
        comment,
        taskId,
        userId: token.uid
      },
      include: {
        user: true
      }
    })

    const task = await prisma.task.findUnique({
      where: {
        id: taskId
      },
      include: {
        project: true,
        user: true
      }
    })

    const user = await prisma.user.findUnique({
      where: {
        id: token.uid
      }
    })

    mailOptions.to = task.user.email
    mailOptions.subject = `New comment`
    mailOptions.user = user.name
    mailOptions.project = task.project.name
    mailOptions.task = task.name
    mailOptions.comment = comment
    mailOptions.link = `${process.env.BASE_URL}/task-detail/${task.id}`

    sendMailTaskComment(mailOptions)

    if (comments) {
      return res.status(200).json({ success: true, data: comments })
    }

    return res.status(400).json({ success: false, message: 'Failed to create comment' })
  }
}
