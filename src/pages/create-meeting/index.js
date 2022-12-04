// ** React Imports
import { useState } from 'react'
import prisma from '../../services/db'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import CreateMeetingDT from 'src/views/create-meeting/CreateMeetingDT'
import { getToken } from 'next-auth/jwt'

const CreateMeetingPage = ({ users }) => {
  return (
    <>
      <DatePickerWrapper>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Create Meeting</h2>
      </Box> */}
        <CreateMeetingDT users={users} />
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
      taskToDo: true,
      UserMeet: true
    }
  })

  const userView = []

  user.forEach(user => {
    userView.push({
      id: user.id,
      name: user.name,
      email: user.email,
      nip: user.nip,
      role: user.role,
      project: user.UserProject.length,
      task: user.taskToDo.length,
      meet: user.UserMeet.length
    })
  })

  userView.sort((a, b) => {
    return a.task - b.task || a.project - b.project
  })

  return {
    props: {
      users: userView
    }
  }
}

export default CreateMeetingPage
