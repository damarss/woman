import prisma from '../../db'

export default async function handler(req, res) {
  const { method } = req

  switch (method) {
    case 'GET':
      // Get data from your database
      const meets = await prisma.meet.findMany()
      if (!meets) {
        

        return res.status(400).json({ success: false })
      }

      
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

        

        res.status(201).json({ success: true, data: meet })
      } catch (error) {
        
        console.log(error)

        return res.status(400).json({ success: false })
      }

      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

  
}
