// ** React Imports
import { useState } from 'react'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import EditMeeting from 'src/views/edit-meeting/EditMeeting'

import { getSession } from 'next-auth/react'
import prisma from 'src/services/db'

const EditMeetingPage = ({ data }) => {
  return (
    <>
      <DatePickerWrapper>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Edit Meeting</h2>
      </Box> */}
        <EditMeeting data={JSON.parse(data)} />
      </DatePickerWrapper>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  const meet = await prisma.meet.findUnique({
    where: {
      id: Number(context.params.id)
    },
    include: {
      UserMeet: {
        include: {
          user: true
        }
      }
    }
  })

  if (session.role !== 'admin') {
    return {
      redirect: {
        destination: '/401',
        permanent: false
      }
    }
  }

  // const people = await prisma.user.findMany({
  //   where: {
  //     id: {
  //       not: 212
  //     }
  //   },
  //   include: {
  //     UserMeet: true
  //   }
  // })

  // const user = people.filter(person => !meet.UserMeet.map(user => user.userId).includes(person.id))

  // user.sort((a, b) => {
  //   return a.UserMeet.length - b.UserMeet.length
  // })

  const data = {
    meet
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default EditMeetingPage
