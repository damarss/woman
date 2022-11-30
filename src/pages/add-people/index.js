// ** MUI Imports
import Card from '@mui/material/Card'
import prisma from '../db'
import { getToken } from 'next-auth/jwt'

// ** People Components Imports
import PeopleTable from 'src/views/people/add-people'
import Swal from 'sweetalert2'

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

  const user = await prisma.user.findMany({
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

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
