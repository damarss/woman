// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import CreateProjectTask from 'src/views/create-project-task/CreateProjectTask'

const CreateProjectTaskPage = () => {
  return (
    <>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Project Description</h2>
      </Box> */}
        <CreateProjectTask />
    </>
  )
}

export default CreateProjectTaskPage
