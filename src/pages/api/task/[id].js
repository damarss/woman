import prisma from '../../../services/db'
import { parseForm, FormidableError } from '../../../lib/parse-form'
import formidable from 'formidable'
import fs from 'fs'

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }

export default async function handler(req, res) {
  const id = req.query.id

  const { method } = req

  if (method === 'GET') {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (!task) {
      return res.status(400).json({ success: false, message: 'Task not found' })
    }

    return res.status(200).json({ success: true, data: task })
  } else if (method === 'POST') {
    console.log('POST')
    try {
      const { fields, files } = await parseForm(req)

      console.log(fields)
      console.log(files)

      return res.status(200).json({ success: true, data: fields })
    } catch (err) {
      console.log(err)

      return res.status(400).json({ success: false })
    }

    return res.status(200).json({ success: true, data: req.body })
  } else if (method === 'PUT') {
    const { title, duedate, priority, description, status, taskfile, projectId, userId } = req.body

    try {
      const task = await prisma.task.update({
        where: {
          id: Number(id)
        },
        data: {
          title,
          duedate,
          priority: Number(priority),
          description,
          status: Number(status),
          taskfile: '',
          projectId: Number(projectId),
          userId: Number(userId)
        }
      })

      return res.status(200).json({ success: true, data: task })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false })
    }
  } else if (method === 'DELETE') {
    try {
      const task = await prisma.task.delete({
        where: {
          id: Number(id)
        }
      })

      return res.status(200).json({ success: true, message: 'Task deleted' })
    } catch (error) {
      console.log(error)

      return res.status(400).json({ success: false, message: 'Task not found' })
    }
  }
}
