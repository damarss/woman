// ** MUI Imports
import Card from '@mui/material/Card'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

// ** People Components Imports
import PeopleTableDT from 'src/views/people/PeopleTableDT'

const PeoplePage = ({ people }) => {
  return (
    <Card>
      <PeopleTableDT rows={JSON.parse(people)} />
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
    where: {
      id: {
        not: 1
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  user.sort((a, b) => {
    return a.taskToDo.length - b.taskToDo.length || a.UserProject.length - b.UserProject.length
  })

  return {
    props: {
      people: JSON.stringify(user)
    }
  }
}

export default PeoplePage
