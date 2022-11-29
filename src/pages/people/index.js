// ** MUI Imports
import Card from '@mui/material/Card'
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt'

// ** People Components Imports
import axios from 'src/pages/api/axios'
import PeopleTable from 'src/views/people/PeopleTable'
import axios from '../api/axios'

const PeoplePage = ({ people }) => {
  return (
    <Card>
      <PeopleTable rows={people} />
    </Card>
  )
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  if (token.role !== 'admin') {
    return {
      redirect: {
        destination: '/401',
        permanent: false
      }
    }
  }

  const prisma = new PrismaClient()

  const user = await prisma.user.findMany({
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  prisma.$disconnect()

  const userView = []

  user.forEach(user => {
    userView.push({
      id: user.id,
      name: user.name,
      role: user.role,
      project: user.UserProject.length,
      task: user.taskToDo.length
    })
  })

  userView.sort((a, b) => {
    return a.task - b.task || a.project - b.project
  })

  return {
    props: {
      people: userView
    }
  }
}

export default PeoplePage
