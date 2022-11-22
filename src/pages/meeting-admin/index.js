// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import MeetingTable from 'src/views/meeting-admin/MeetingTable'

const MeetingPage = () => {
  return (
    <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Jadwal Rapat</h2>
      </Box> */}
      <MeetingTable />
    </>
  )
}

export default MeetingPage
