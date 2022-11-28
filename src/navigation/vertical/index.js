// ** react imports
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import TextBoxMultipleOutline from 'mdi-material-ui/TextBoxMultipleOutline'
import MessageVideo from 'mdi-material-ui/MessageVideo'
import Plus from 'mdi-material-ui/Plus'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import VideoOutline from 'mdi-material-ui/VideoOutline'
import axios from 'src/pages/api/axios'

const Navigation = () => {
  const [userRole, setUserRole] = useState('')

  const getUserRole = async () => {
    const res = await axios.get('/user/detail')
    if (res.status === 200) {
      setUserRole(res.data.role)
    }
  }

  useEffect(() => {
    getUserRole()
  }, [])

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
        path: '/meeting'
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
        path: '/meeting'
      }
    ]
  }
}

export default Navigation
