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
    const { title, startdate, enddate, description, projectLeaderId} = req.body
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

      mailOptions.to = ''
      mailOptions.subject = title
      mailOptions.text = `Anda telah ditambahkan ke dalam project ${title} untuk tanggal ${new Date(
        startdate
      ).toLocaleDateString()} hingga tanggal ${new Date(enddate).toLocaleDateString()}.`

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
  }
}
