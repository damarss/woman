import prisma from '../../db'
import Gmail, { mailOptions } from 'src/services/Gmail'
import { sendMailMeetCreated}  from 'src/services/sendEmail'

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
        mailOptions.title = title
        mailOptions.description = description
        mailOptions.startdate = new Date(startDate).toLocaleDateString('id-ID')
        mailOptions.starttime = new Date(startDate).getHours()+':'+(new Date(startDate).getMinutes() < 10 ? '0' : '') + new Date(endDate).getMinutes()
        mailOptions.endtime = new Date(endDate).getHours()+':'+(new Date(endDate).getMinutes() < 10 ? '0' : '') + new Date(endDate).getMinutes()
        mailOptions.enddate = new Date(endDate).toLocaleDateString('id-ID')
        mailOptions.link = link 
        mailOptions.duration = duration

        // Gmail.sendMail(mailOptions, function (error, info) {
        //   if (error) {
        //     console.log(error)
        //   } else {
        //     console.log('Email sent: ' + info.response)
        //   }
        // })

        sendMailMeetCreated(mailOptions)

      return res.status(201).json({ success: true, data: meet })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
