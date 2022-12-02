// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import TaskDetail from 'src/views/task/TaskDetail'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { getToken } from 'next-auth/jwt'
import prisma from '../db'

const TaskDetailPage = ({ data }) => {
  return (
    <ApexChartWrapper>
      <Grid container>
        <TaskDetail task={JSON.parse(data)} />
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

  const task = await prisma.task.findUnique({
    where: {
      id: parseInt(context.params.id)
    }
  })

  if (task.userId !== token.uid && token.role !== 'admin') {
    return {
      redirect: {
        destination: '/401',
        permanent: false
      }
    }
  }

  const comments = await prisma.taskComment.findMany({
    where: {
      taskId: parseInt(context.params.id)
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
          password: false
        }
      }
    }
  })

  const data = {
    task,
    comments
  }

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default TaskDetailPage
