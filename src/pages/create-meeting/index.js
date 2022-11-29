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
import CreateMeeting from 'src/views/create-meeting/CreateMeeting'
import { getToken } from 'next-auth/jwt'

const CreateMeetingPage = () => {
  return (
    <>
      <DatePickerWrapper>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Create Meeting</h2>
      </Box> */}
        <CreateMeeting />
      </DatePickerWrapper>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  console.log(token)

  if (token.role !== 'admin') {
    return {
      redirect: {
        destination: '/401',
        permanent: false
      }
    }
  }

  return {
    props: {
      // res: JSON.stringify(res.data)
    }
  }
}

export default CreateMeetingPage
