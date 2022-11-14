// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import CreateProject from 'src/views/create-project/CreateProject'

const CreateProjectPage = () => {
  return (
    <>
      <DatePickerWrapper>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Project Description</h2>
      </Box> */}
        <CreateProject />
      </DatePickerWrapper>
    </>
  )
}

export default CreateProjectPage
