import prisma from '../../services/db'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import CreateProjectDT from 'src/views/create-project/CreateProjectDT'
import { getToken } from 'next-auth/jwt'

const CreateProjectPage = ({ users }) => {
  return (
    <>
      <DatePickerWrapper>
        <CreateProjectDT users={JSON.parse(users)} />
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

  console.log(user)

  return {
    props: {
      users: JSON.stringify(user)
    }
  }
}

export default CreateProjectPage
