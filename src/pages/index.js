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
import { getToken } from 'next-auth/jwt'
import { useEffect, useState } from 'react'

import prisma from './db'

const Dashboard = ({ data }) => {
  const [dashboard, setDashboard] = useState(JSON.parse(data))

  useEffect(() => {}, [])

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Tugas taskNumber={dashboard.tasks.length} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Today's Tasks" titleTypographyProps={{ variant: 'h6' }} />
            <TaskTable tasks={dashboard.tasks} />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title='My Projects' titleTypographyProps={{ variant: 'h6' }} />
            <ProjectTable projects={dashboard.projects} />
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <CardMeetingSce />
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

  const projects = await prisma.userProject.findMany({
    where: {
      userId: token.uid
    },
    include: {
      project: true
    }
  })

  const tasks = await prisma.task.findMany({
    where: {
      userId: token.uid
    },
    include: {
      project: true
    }
  })

  const data = { projects: [...projects], tasks: [...tasks] }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default Dashboard
