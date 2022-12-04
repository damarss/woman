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
import { useRouter } from 'next/router'

import prisma from '../services/db'

const Dashboard = ({ data }) => {
  const [dashboard, setDashboard] = useState(JSON.parse(data))
  const router = useRouter()

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
          <CardMeetingSce meet={dashboard.meet} />
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

  let meet
  if (token.role !== 'admin') {
    meet = await prisma.userMeet.findMany({
      where: {
        userId: token.uid
      },
      include: {
        meet: true
      }
    })
  } else {
    meet = await prisma.userMeet.findMany({
      include: {
        meet: true
      }
    })
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

  const dateMeet = []

  meet.forEach(date => {
    dateMeet.push({
      date: date.meet.startDate,
      link: date.meet.link,
      id: date.meet.id
    })
  })
  const target = new Date()

  function nearestDate(dates, target) {
    if (!target) {
      target = Date.now()
    } else if (target instanceof Date) {
      target = target
    }

    let nearest = Infinity
    let winner = -1

    dates.forEach(function (date, index) {
      if (date.date instanceof Date) {
        date = date.date
      }
      if (date > target) {
        let distance = Math.abs(date - target)
        if (distance < nearest) {
          nearest = distance
          winner = index
        }
      }
    })

    return winner
  }

  const nearestDates = dateMeet[nearestDate(dateMeet)]

  const data = { projects: [...projects], tasks: [...tasks], meet: nearestDates }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default Dashboard
