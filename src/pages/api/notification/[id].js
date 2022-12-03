import prisma from '../../../services/db'

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
  } else if (req.method === 'PUT') {
    const { userId } = req.body

    const notification = await prisma.notification.update({
      where: {
        userId: userId,
        id: Number(req.query.id)
      },
      data: {
        isRead: true
      }
    })

    return res.status(200).json(notification)
  }
}
