import axios from 'src/pages/api/axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TaskHome from 'src/views/task/TaskHome'
import { useEffect, useState } from 'react'

const Task = props => {
  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    const res = await axios.get('/task')
    console.log(res.data)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <ApexChartWrapper>
      <Grid container>
        <Grid item xs={12} mb={5}>
          <Card>
            <CardHeader title="Today's Task" titleTypographyProps={{ variant: 'h6' }} />
            <TaskHome tasks={tasks} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Other's Task" titleTypographyProps={{ variant: 'h6' }} />
            <TaskHome tasks={tasks} />
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Task
