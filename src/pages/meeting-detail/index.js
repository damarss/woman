// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import MeetingDetail from 'src/views/meeting-detail/MeetingDetail'

const MeetingPage = () => {
  return (
    <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Deskripsi Rapat</h2>
      </Box> */}
      <MeetingDetail />
    </>
  )
}

export default MeetingPage
