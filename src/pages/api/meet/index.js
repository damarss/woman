import prisma from '../../db'
import Gmail, { mailOptions } from 'src/services/Gmail'

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
      const { title, startDate, endDate, duration, link, description, participants } = req.body
      try {
        const meet = await prisma.meet.create({
          data: {
            title,
            startDate,
            endDate,
            duration: Number(duration),
            link,
            description
          }
        })

        participants.map(async participant => {
          if (participant.checked) {
            const userMeet = await prisma.userMeet.create({
              data: {
                userId: participant.id,
                meetId: meet.id
              }
            })
          }
        })

        mailOptions.to = participants.map(participant => {
          if (participant.checked) {
            return participant.email
          }
        })
        mailOptions.subject = title
        mailOptions.html = `<p>Anda telah ditambahkan ke dalam Meeeting ${title} untuk tanggal ${new Date(
          startDate
        ).toLocaleDateString()} sampai pukul ${new Date(endDate).toLocaleDateString()} menit.
        <br />
        Informasi mengenai meeting dapat dilihat di <a href='${process.env.BASE_URL}/meeting/'>link ini</a></p>`

        Gmail.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
          } else {
            console.log('Email sent: ' + info.response)
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
