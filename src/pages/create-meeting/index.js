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

export default CreateMeetingPage
