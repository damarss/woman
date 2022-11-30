import { getToken } from 'next-auth/jwt'
import prisma from '../../db'

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

    if (comments) {
      return res.status(200).json({ success: true, data: comments })
    }

    return res.status(400).json({ success: false, message: 'Failed to create comment' })
  }
}
