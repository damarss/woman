import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
  const { method } = req
  const prisma = new PrismaClient()

  switch (method) {
    case 'GET':
      // Get data from your database
      const meets = await prisma.meet.findMany()
      if (!meets) {
        prisma.$disconnect()

        return res.status(400).json({ success: false })
      }

      prisma.$disconnect()
      res.status(200).json({ success: true, data: meets })

      break

    case 'POST':
      const { title, start, duration, link, description } = req.body
      try {
        const meet = await prisma.meet.create({
          data: {
            title,
            start,
            duration: Number(duration),
            link,
            description
          }
        })

        prisma.$disconnect()

        res.status(201).json({ success: true, data: meet })
      } catch (error) {
        prisma.$disconnect()
        console.log(error)

        return res.status(400).json({ success: false })
      }

      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

  prisma.$disconnect()
}
