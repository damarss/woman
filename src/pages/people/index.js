// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** People Components Imports
import axios from 'src/pages/api/axios'
import PeopleTable from 'src/views/people/PeopleTable'

const PeoplePage = ({users}) => {
  return (
    <Card>
      {/* <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} /> */}
      <PeopleTable users={users}/>
    </Card>
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

export default PeoplePage
