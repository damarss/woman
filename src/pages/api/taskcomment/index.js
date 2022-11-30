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
    const { comment, taskId, userId } = req.body
    console.log(req.body)
  }
}
