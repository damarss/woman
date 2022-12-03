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
      <MeetingDetail role={meet.role} data={meet.meet}/>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
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


  // let roleU = session.role
  // let idU = session.uid
  // function getUser(item) {
  //   if ((idU !== item.userId) && (roleU !== 'admin')) {
  //     return {
  //       redirect: {
  //         destination: '/401',
  //         permanent: false
  //       }
  //     }
  //   }
  // }
  // meet.UserMeet.map(getUser)


  // if (session.role !== 'admin') {
  //   return {
  //     redirect: {
  //       destination: '/401',
  //       permanent: false
  //     }
  //   }
  // }

  const data = {
    meet: meet,
    role: session.role
  }

  console.log(session)

  return {
    props: {
      data: JSON.stringify(data)
    }
  }
}

export default MeetingPage
