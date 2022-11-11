// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

// ** People Components Imports
import HeadPeopleTable from 'src/views/people/HeadPeopleTable'
import BodyPeopleTable from 'src/views/people/BodyPeopleTable'

const PeoplePage = () => {
  return (
    <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
        <h1>Anggota</h1>
      </Box> */}
      <HeadPeopleTable />
      <br></br>
      <BodyPeopleTable />
    </>
  )
}

export default PeoplePage
