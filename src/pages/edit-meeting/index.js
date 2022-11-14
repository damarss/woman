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
import EditMeeting from 'src/views/meeting-aris/EditMeeting'

const EditMeetingPage = () => {
  return (
    <>
      <DatePickerWrapper>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Edit Meeting</h2>
      </Box> */}
        <EditMeeting />
      </DatePickerWrapper>
    </>
  )
}

export default EditMeetingPage
