// ** React Imports
import { useState } from 'react'
import axios from 'src/pages/api/axios'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import CreateProject from 'src/views/create-project/CreateProject'

const CreateProjectPage = ({ users }) => {
  return (
    <>
      <DatePickerWrapper>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
        <h2>Project Description</h2>
      </Box> */}
        <CreateProject users = {users}/>
      </DatePickerWrapper>
    </>
  )
}

export async function getServerSideProps() {
  const res = await axios.get('/user')
  const users = res.data
  
  return {
    props: {
      users
    }
  }
}

export default CreateProjectPage
