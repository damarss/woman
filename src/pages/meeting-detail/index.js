// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import MeetingDetailm from 'src/views/meeting-detail/MeetingDetailm'

const MeetingPage = () => {
  return (
    <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Deskripsi Rapat</h2>
      </Box> */}
      <MeetingDetailm />
    </>
  )
}

export default MeetingPage
