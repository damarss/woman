// ** React Imports
import { useEffect, useState } from 'react'
import prisma from 'src/services/db'
import { getToken } from 'next-auth/jwt'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'




// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import MeetingTable from 'src/views/meeting-admin/MeetingTable'

const MeetingPage = ({ data }) => {
  const [meet, setMeet] = useState([])

  useEffect(() => {
    setMeet(JSON.parse(data))
    console.log(JSON.parse(data))
  }, [])
  const NotFound = props => (
    <Grid container justifyContent='center' alignItems='center'>
      <Typography variant='body1' sx={{ marginBottom: 10 }}>{props.title}</Typography>
    </Grid>
  )

  return (
    <>
      <Card>
        <CardHeader title="Meeting Schedule" titleTypographyProps={{ variant: 'h6' }} />
        {meet.length > 0 ? <MeetingTable data={meet} height='70vh' /> : <NotFound title='No Meeting Schedule' />}
      </Card>
    </>
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

  if (token.role !== 'admin') {
    return {
      redirect: {
        destination: '/401',
        permanent: false
      }
    }
  }

  const meet = await prisma.meet.findMany()

  return {
    props: {
      data: JSON.stringify(meet)
    }
  }
}

export default MeetingPage
