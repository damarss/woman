import axios from 'src/pages/api/axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TaskHome from 'src/views/task/TaskHome'
import { useEffect, useState } from 'react'
import prisma from 'src/pages/db'
import { getToken } from 'next-auth/jwt'

const Task = ({data}) => {

  const [tasks, setTasks] = useState([])

  const NotFound = () => (
    <Grid container justifyContent='center' alignItems='center'>
      <Grid item>
        <Typography variant='h6'>Task Not Found</Typography>
      </Grid>
    </Grid>
  )

  useEffect(() => {
    setTasks(JSON.parse(data))
  }, [data])

  return (
    <ApexChartWrapper>
      <Grid container>
        <Grid item xs={12} mb={5}>
          <Card>
            <CardHeader title="Today's Task" titleTypographyProps={{ variant: 'h6' }} />
            {tasks.length > 0 ? (
              <TaskHome tasks={tasks} />
            ) : (
              <NotFound />
            )}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Other's Task" titleTypographyProps={{ variant: 'h6' }} />
            {tasks.length > 0 ? (
              <TaskHome tasks={tasks} />
            ) : (
              <NotFound />
            )}
          </Card>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: token.uid
    }
  })

  console.log(tasks)

  return {
    props: {
      data: JSON.stringify(tasks)
    }
  }
}

export default Task
