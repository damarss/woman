import axios from 'src/pages/api/axios'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import TaskHomeDT from 'src/views/task/TaskHomeDT'
import { useEffect, useState } from 'react'
import prisma from 'src/services/db'
import { getToken } from 'next-auth/jwt'

const Task = ({ data }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(data).filter(task => new Date(task.duedate).toDateString() !== new Date().toDateString())
  )

  const [todayTasks, setTodayTasks] = useState(
    JSON.parse(data).filter(task => new Date(task.duedate).toDateString() === new Date().toDateString())
  )

  const NotFound = props => (
    <Grid container justifyContent='center' alignItems='center'>
        <Typography variant='body1' sx={{marginBottom: 10}}>{props.title}</Typography>
    </Grid>
  )

  useEffect(() => {}, [])

  return (
    <ApexChartWrapper>
      <Grid container>
        <Grid item xs={12} mb={5}>
          <Card>
            <CardHeader title="Today's Task" titleTypographyProps={{ variant: 'h6' }} />
            {todayTasks.length > 0 ? <TaskHomeDT tasks={todayTasks} height='50vh'/> : <NotFound title='No Task Today'/>}
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='All Task' titleTypographyProps={{ variant: 'h6' }} />
            {tasks.length > 0 ? <TaskHomeDT tasks={tasks} height={tasks.length>9 ? '87vh': tasks.length * 50 + 150}/> : <NotFound title='Not Found'/>}
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

  let tasks

  if (token.role !== 'admin') {
    tasks = await prisma.task.findMany({
      where: {
        userId: token.uid
      },
      include: {
        project: true
      }
    })
  } else {
    tasks = await prisma.task.findMany({
      include: {
        project: true
      }
    })
  }

  return {
    props: {
      data: JSON.stringify(tasks)
    }
  }
}

export default Task
