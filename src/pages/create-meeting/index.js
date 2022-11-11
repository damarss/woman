// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import CreateMeeting from 'src/views/meeting-aris/CreateMeeting'

const CreateMeetingPage = () => {
  return (
    <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Deskripsi Rapat</h2>
      </Box> */}
      <CreateMeeting />
    </>
  )
}

export default CreateMeetingPage
