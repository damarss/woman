import prisma from '../db'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import CreateProject from 'src/views/create-project/CreateProject'
import { getToken } from 'next-auth/jwt'

const CreateProjectPage = ({ users }) => {
  return (
    <>
      <DatePickerWrapper>
        <CreateProject users={users} />
      </DatePickerWrapper>
    </>
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
      nip: user.nip,
      role: user.role,
      project: user.UserProject.length,
      task: user.taskToDo.length
    })
  })

  userView.sort((a, b) => {
    return a.task - b.task || a.project - b.project
  })

  console.log(userView)

  return {
    props: {
      users: userView
    }
  }
}

export default CreateProjectPage
