// ** React Imports
import { useEffect, useState } from 'react'
import prisma from 'src/pages/db'
import { getToken } from 'next-auth/jwt'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import MeetingTable from 'src/views/meeting-admin/MeetingTable'

const MeetingPage = ({data}) => {
  const [meet, setMeet] = useState([])

  useEffect(() => {
    setMeet(JSON.parse(data))
    console.log(JSON.parse(data))
  }, [])
  
  return (
    <>
      <MeetingTable data={meet}/>
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
