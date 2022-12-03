// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Meeting Components Imports
import MeetingDetail from 'src/views/meeting-detail/MeetingDetail'
import Swal from 'sweetalert2'
import { getToken } from 'next-auth/jwt'
import { useState } from 'react'
import prisma from 'src/services/db'

const MeetingPage = ({ data }) => {
  const [meet, setMeet] = useState(JSON.parse(data))

  return (
    <>
      <MeetingDetail data={meet} />
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

  const meet = await prisma.meet.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      UserMeet: {
        include: {
          user: true
        }
      }
    }
  })

  console.log(meet)

  return {
    props: {
      data: JSON.stringify(meet)
    }
  }
}

export default MeetingPage
