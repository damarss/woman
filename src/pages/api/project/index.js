import prisma from '../../../services/db'
import { mailOptions, sendMailProjectCreated } from 'src/services/sendEmail'

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
      mailOptions.title = title
      mailOptions.description = description
      mailOptions.startdate = new Date(startdate).toLocaleDateString('id-ID')
      mailOptions.enddate = new Date(enddate).toLocaleDateString('id-ID')
      mailOptions.link = `${process.env.BASE_URL}/project-detail/${project.id}`

      sendMailProjectCreated(mailOptions)

      return res.status(201).json({ success: true, data: project })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  }
}
