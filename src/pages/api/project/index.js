import prisma from '../../db'
import Gmail, { mailOptions } from 'src/services/Gmail'

export default async function handler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const projects = await prisma.project.findMany()
    if (!projects) {
      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: projects })
  }

  if (method === 'POST') {
    const { title, startdate, enddate, description, projectLeaderId, participants } = req.body

    try {
      const project = await prisma.project.create({
        data: {
          title,
          startdate,
          enddate,
          description,
          isArchived: false,
          projectLeaderId
        }
      })

      participants.map(async participant => {
        if (participant.checked) {
          const userProject = await prisma.userProject.create({
            data: {
              userId: participant.id,
              projectId: project.id
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
      mailOptions.html = `<p>Anda telah ditambahkan ke dalam project ${title} untuk tanggal ${new Date(
        startdate
      ).toLocaleDateString()} hingga tanggal ${new Date(enddate).toLocaleDateString()}.
      <br />
      Informasi mengenai projet dapat dilihat di <a href='${process.env.BASE_URL}/project-detail/'>link ini</a></p>` 

      Gmail.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })

      return res.status(201).json({ success: true, data: project })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
