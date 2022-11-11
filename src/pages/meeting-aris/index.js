// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import HeadMeetingTable from 'src/views/meeting-aris/meeting-table/HeadMeetingTable'
import BodyMeetingTable from 'src/views/meeting-aris/meeting-table/BodyMeetingTable'

const MeetingPage = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Jadwal Rapat</h2>
      </Box>
      <HeadMeetingTable />
      <br></br>
      <BodyMeetingTable />
    </>
  )
}

export default MeetingPage
