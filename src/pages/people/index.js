// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** People Components Imports
import PeopleTable from 'src/views/people/PeopleTable'

const PeoplePage = () => {
  return (
    <Card>
      {/* <CardHeader title='Dense Table' titleTypographyProps={{ variant: 'h6' }} /> */}
      <PeopleTable />
    </Card>
  )
}

export default PeoplePage
