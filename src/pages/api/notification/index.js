import prisma from '../../db'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.query.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return res.status(200).json(notifications)
  }

  if (req.method === 'POST') {
    const { title, message } = req.body

    const notification = await prisma.notification.create({
      data: {
        userId: 1,
        title: 'title',
        message: 'message',
        type: 'info'
      }
    })

    return res.status(200).json(notification)
  }

  if (req.method === 'PUT') {
    const { userId } = req.body

    console.log(userId)

    const notification = await prisma.notification.updateMany({
      where: {
        userId: userId,
        isRead: false
      },
      data: {
        isRead: true
      }
    })

    return res.status(200).json(notification)
  }
}
