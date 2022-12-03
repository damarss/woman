import prisma from '../../../services/db'
import nextConnect from 'next-connect'
import multer from 'multer'
import fs from 'fs'

const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
})

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log(error)
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  }
})

apiRoute.use(upload.single('file'))

apiRoute.post(async (req, res) => {
  const id = req.query.id
  console.log(req.file)

  const existTask = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!existTask) {
    return res.status(400).json({ success: false, message: 'Task not found' })
  }

  const taskfile = req.file.originalname

  // remove old file
  if (existTask.taskfile && existTask.taskfile != taskfile) {
    await unlinkAsync(`./public/uploads/${existTask.taskfile}`)
  }

  const task = await prisma.task.update({
    where: {
      id: Number(id)
    },
    data: {
      taskfile: taskfile
    }
  })

  // tambahin logic untuk kirim email ke project leader

  return res.status(200).json({ success: true, data: task })
})

apiRoute.get(async (req, res) => {
  const id = req.query.id

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!task) {
    return res.status(400).json({ success: false, message: 'Task not found' })
  }

  return res.status(200).json({ success: true, data: task })
})

apiRoute.delete(async (req, res) => {
  const id = req.query.id

  const task = await prisma.task.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!task) {
    return res.status(400).json({ success: false, message: 'Task not found' })
  }

  if (task.taskfile) {
    await unlinkAsync(`./public/uploads/${task.taskfile}`)
  }

  const deletedTask = await prisma.task.delete({
    where: {
      id: Number(id)
    }
  })

  return res.status(200).json({ success: true, data: deletedTask })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false
  }
}

// export default async function handler(req, res) {
//   const id = req.query.id

//   const { method } = req

//   if (method === 'GET') {
//     const task = await prisma.task.findUnique({
//       where: {
//         id: Number(id)
//       }
//     })

//     if (!task) {
//       return res.status(400).json({ success: false, message: 'Task not found' })
//     }

//     return res.status(200).json({ success: true, data: task })
//   } else if (method === 'POST') {
//     console.log('POST')
//     try {
//       const { fields, files } = await parseForm(req)

//       console.log(fields)
//       console.log(files)

//       return res.status(200).json({ success: true, data: fields })
//     } catch (err) {
//       console.log(err)

//       return res.status(400).json({ success: false })
//     }

//     return res.status(200).json({ success: true, data: req.body })
//   } else if (method === 'PUT') {
//     const { title, duedate, priority, description, status, taskfile, projectId, userId } = req.body

//     try {
//       const task = await prisma.task.update({
//         where: {
//           id: Number(id)
//         },
//         data: {
//           title,
//           duedate,
//           priority: Number(priority),
//           description,
//           status: Number(status),
//           taskfile: '',
//           projectId: Number(projectId),
//           userId: Number(userId)
//         }
//       })

//       return res.status(200).json({ success: true, data: task })
//     } catch (error) {
//       console.log(error)

//       return res.status(400).json({ success: false })
//     }
//   } else if (method === 'DELETE') {
//     try {
//       const task = await prisma.task.delete({
//         where: {
//           id: Number(id)
//         }
//       })

//       return res.status(200).json({ success: true, message: 'Task deleted' })
//     } catch (error) {
//       console.log(error)

//       return res.status(400).json({ success: false, message: 'Task not found' })
//     }
//   }
// }
