// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Hooks
import { useEffect, useState } from 'react'
import prisma from 'src/pages/db'
import { getToken } from 'next-auth/jwt'

// ** Scheduler
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip,
  TodayButton,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';

const Meeting = ({data}) => {
  const [currentDate, setCurrentDate] = useState(new Date);
  const currentDateChange = (currentDate) => { setCurrentDate(currentDate); };
  const [meets, setMeets] = useState([])


  useEffect(() => {
    setMeets(JSON.parse(data))
  }, [data])

  const meetView = []

  meets.forEach(meets => {
    meetView.push({
      startDate: meets.meet.startDate,
      endDate: meets.meet.endDate,
      location: meets.meet.description,
      title: meets.meet.title
    })
  })

  return (
    <Paper>
      <Scheduler
        data={meetView}
        height={660}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <WeekView
          startDayHour={7}
          endDayHour={21}
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip
          showCloseButton
        />
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



  let meets
  if (token.role !== 'admin') {
    meets = await prisma.userMeet.findMany({
      where: {
        userId: token.uid
      },
      include: {
        meet: true
      }
    })
  } else {
    const key = []
    meets = []

    const meetGet = await prisma.userMeet.findMany({
      include: {
        meet: true
      }
    })

    meetGet.map(meet => {
      if (key.includes(meet.meet.id)) {
        return
      }

      key.push(meet.meet.id)
      meets.push(meet)
    })
  }

  console.log(meets)

  return {
    props: {
      data: JSON.stringify(meets)
    }
  }
}

export default Meeting
