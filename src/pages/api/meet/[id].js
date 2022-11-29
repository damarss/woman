import prisma from '../../db'

export default async function handler(req, res) {
  const id = req.query.id
  const { method } = req

  if (method === 'GET') {
    // Get data from your database
    const meet = await prisma.meet.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!meet) {
      res.status(400).json({ success: false })
    }

    res.status(200).json({ success: true, data: meet })
  } else if (method === 'PUT') {
    const { title, start, duration, link, description } = req.body
    try {
      const meet = await prisma.meet.update({
        where: {
          id: Number(id)
        },
        data: {
          title,
          start,
          duration: Number(duration),
          link,
          description
        }
      })

      res.status(200).json({ success: true, data: meet })
    } catch (error) {
      console.log(error)

      res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const meet = await prisma.meet.delete({
        where: {
          id: Number(id)
        }
      })

      res.status(200).json({ success: true, message: 'Meet deleted' })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}
