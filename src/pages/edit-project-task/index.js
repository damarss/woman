// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import EditProjectTask from 'src/views/edit-project-task/EditProjectTask'

const EditProjectTaskPage = () => {
  return (
    <>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Project Description</h2>
      </Box> */}
        <EditProjectTask />
    </>
  )
}

export default EditProjectTaskPage
