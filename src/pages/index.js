// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Tugas from 'src/views/dashboard/Tugas'
import ProjectTable from 'src/views/dashboard/ProjectTable'
import CardMeetingSce from 'src/views/cards/CardMeetingSce'
import TaskTable from 'src/views/dashboard/TaskTable'

const Dashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Tugas />
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Today's Tasks" titleTypographyProps={{ variant: 'h6' }} />
            <TaskTable />
          </Card>
        </Grid>
        <Grid item xs={12} md ={8}>
          <Card>
            <CardHeader title='My Projects' titleTypographyProps={{ variant: 'h6' }} />
            <ProjectTable />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardMeetingSce />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}


export default Dashboard