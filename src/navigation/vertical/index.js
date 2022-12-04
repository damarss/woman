// ** react imports
import { useEffect, useState } from 'react'

// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import TextBoxMultipleOutline from 'mdi-material-ui/TextBoxMultipleOutline'
import MessageVideo from 'mdi-material-ui/MessageVideo'
import Plus from 'mdi-material-ui/Plus'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import VideoOutline from 'mdi-material-ui/VideoOutline'
import axios from 'src/pages/api/axios'
import { FormatLetterCase, GoogleCirclesExtended, CreditCardOutline, CubeOutline } from 'mdi-material-ui'
import { Table } from '@mui/material'
import { useSession } from 'next-auth/react'

const Navigation = () => {
  const [userRole, setUserRole] = useState('')
  const session = useSession()

  const getUserRole = async () => {
    setUserRole(session?.data?.role)
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      getUserRole()
    }
  }, [session])

  // ** for employee
  if (userRole === 'admin') {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Create Project',
        icon: Plus,
        path: '/create-project'
      },
      {
        title: 'Create Meeting',
        icon: Plus,
        path: '/create-meeting'
      },
      {
        title: 'Task',
        icon: ClipboardFileOutline,
        path: '/task'
      },
      {
        title: 'Project',
        icon: TextBoxMultipleOutline,
        path: '/project'
      },
      {
        title: 'People',
        icon: AccountGroupOutline,
        path: '/people'
      },
      {
        title: 'Meeting Scedule',
        icon: MessageVideo,
        path: '/meeting-schedule'
      },
      {
        title: 'Meeting Setting',
        icon: VideoOutline,
        path: '/meeting-admin'
      }
    ]
  } else {
    return [
      {
        title: 'Dashboard',
        icon: HomeOutline,
        path: '/'
      },
      {
        title: 'Task',
        icon: ClipboardFileOutline,
        path: '/task'
      },
      {
        title: 'Project',
        icon: TextBoxMultipleOutline,
        path: '/project'
      },
      {
        title: 'Meeting Scedule',
        icon: MessageVideo,
        path: '/meeting-schedule'
      }
    ]
  }
}

export default Navigation
