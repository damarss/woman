// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import CreateProject from 'src/views/create-project/CreateProject'

const CreateProjectPage = () => {
  return (
    <>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Deskripsi Rapat</h2>
      </Box> */}
      <CreateProject />
    </>
  )
}

export default CreateProjectPage
