// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import EditProject from 'src/views/edit-project/EditProject'

import { getSession } from 'next-auth/react'
import prisma from '../../services/db'
import { getToken } from 'next-auth/jwt'

const EditProjectPage = ({ data }) => {
  return (
    <>
      <DatePickerWrapper>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Project Description</h2>
      </Box> */}
        <EditProject data={JSON.parse(data)} />
      </DatePickerWrapper>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  const project = await prisma.project.findUnique({
    where: {
      id: Number(context.params.id)
    },
    include: {
      UserProject: true
    }
  })


  if (project.projectLeaderId !== token.uid && token.role !== 'admin') {
    return {
      redirect: {
        destination: '/401',
        permanent: false
      }
    }
  }

  const people = await prisma.user.findMany({
    where: {
      id: {
        not: 212
      }
    },
    include: {
      UserProject: true,
      taskToDo: true
    }
  })

  const user = people.filter(person => !project.UserProject.map(user => user.userId).includes(person.id))

  user.sort((a, b) => {
    return a.taskToDo.length - b.taskToDo.length || a.UserProject.length - b.UserProject.length
  })

  console.log(user)

  const data = {
    project,
    user
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default EditProjectPage
