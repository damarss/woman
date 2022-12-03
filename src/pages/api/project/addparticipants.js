import { mailOptions, sendMailNewParticipantAdded } from 'src/services/sendEmail'
import prisma from '../../db'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { project, participants } = req.body

    try {
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
      mailOptions.subject = project.title
      mailOptions.title = project.title
      mailOptions.description = project.description
      mailOptions.startdate = new Date(project.startdate).toLocaleDateString('id-ID')
      mailOptions.enddate = new Date(project.enddate).toLocaleDateString('id-ID')
      mailOptions.link = `${process.env.BASE_URL}/project-detail/${project.id}`

      sendMailNewParticipantAdded(mailOptions)

      return res.status(201).json({ success: true })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }
  }
}
