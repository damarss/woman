// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Hooks
import { useState, useEffect } from 'react';

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
  TodayButton,
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

const Meeting = () => {
  const [currentDate, setCurrentDate] = useState('2022-11-11');
  const currentDateChange = (currentDate) => { setCurrentDate(currentDate); };
  return (
    <Paper>
        <Scheduler
          data={schedulerData}
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
        </Scheduler>
      </Paper>
  )
}

export default Meeting
