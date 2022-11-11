// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import EditMeeting from 'src/views/meeting-aris/EditMeeting'

const EditMeetingPage = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Edit Rapat</h2>
      </Box>
      <EditMeeting />
    </>
  )
}

export default EditMeetingPage
