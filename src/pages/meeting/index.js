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

// ** Demo Components Imports
const schedulerData = [
  { startDate: '2022-11-11T09:30', endDate: '2022-11-11T11:00', title: 'Meeting Ketiga' },
  { startDate: '2022-11-12T12:00', endDate: '2022-11-12T13:30', title: 'Meeting Keempat' },
  { startDate: '2022-11-10T15:00', endDate: '2022-11-10T18:00', title: 'Meeting Kedua' },
  { startDate: '2022-11-09T14:00', endDate: '2022-11-09T16:00', title: 'Meeting Perdana' },
  { startDate: '2022-11-07T11:00', endDate: '2022-11-07T15:00', title: 'Rencana Proyek' },
  { startDate: '2022-11-08T10:00', endDate: '2022-11-08T16:00', title: 'Inisiasi Proyek' },
];

const Meeting = ({data}) => {
  const [currentDate, setCurrentDate] = useState(new Date);
  const currentDateChange = (currentDate) => { setCurrentDate(currentDate); };
  const [meet, setMeet] = useState([])

  useEffect(() => {
    setMeet(JSON.parse(data))
    console.log(JSON.parse(data))
    console.log(schedulerData)
  }, [data])

  return (
    <Paper>
      <Scheduler
        data={meet}
        height={660}
      >
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={currentDateChange}
        />
        <WeekView
          startDayHour={9}
          endDayHour={19}
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

  const meet = await prisma.meet.findMany()

  console.log(meet)

  return {
    props: {
      data: JSON.stringify(meet)
    }
  }
}

export default Meeting
