// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Hooks
import { useEffect, useState } from 'react'
import prisma from 'src/services/db'
import { getToken } from 'next-auth/jwt'

// ** Scheduler
import Paper from '@mui/material/Paper'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  MonthView,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  TodayButton,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui'

const Meeting = ({ data }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const currentDateChange = currentDate => {
    setCurrentDate(currentDate)
  }
  const [meet, setMeet] = useState([])

  useEffect(() => {
    setMeet(JSON.parse(data))
    console.log(JSON.parse(data))
  }, [data])

  const meetView = []

  meet.forEach(meet => {
    meetView.push({
      startDate: meet.startDate,
      endDate: meet.endDate,
      location: meet.description,
      title: meet.title
    })
  })

  return (
    <Paper>
      <Scheduler data={meetView} height={660}>
        <ViewState currentDate={currentDate} onCurrentDateChange={currentDateChange} />
        <WeekView startDayHour={7} endDayHour={21} />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip showCloseButton />
      </Scheduler>
    </Paper>
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

  const meet = await prisma.meet.findMany()

  console.log(meet)

  return {
    props: {
      data: JSON.stringify(meet)
    }
  }
}

export default Meeting
