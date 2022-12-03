// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import CalendarCheckOutline from 'mdi-material-ui/CalendarCheckOutline'
import ClipboardFileOutline from 'mdi-material-ui/ClipboardFileOutline'
import TextBoxMultipleOutline from 'mdi-material-ui/TextBoxMultipleOutline'
import MessageVideo from 'mdi-material-ui/MessageVideo'
import Plus from 'mdi-material-ui/Plus'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import VideoOutline from 'mdi-material-ui/VideoOutline'
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Import Router
import { useRouter } from 'next/router'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Typography } from '@mui/material'
import { PrismaClient } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getToken } from 'next-auth/jwt'

const AppBarContent = props => {

  useEffect(() => {
  }, [])

  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  // ** Router
  const route = useRouter()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        {route.asPath === '/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <HomeOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Dashboard
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/project/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Project List
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/project-detail/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Project Detail
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-project/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Create Project
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/project-detail-create-project-task/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Add Task
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-project/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Edit Project
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-project-task/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <TextBoxMultipleOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Edit Task
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/task/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Task List
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/task-detail/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Task Detail
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-task/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Create Task
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-task/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <ClipboardFileOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Edit Task
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/meeting-schedule/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <MessageVideo />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Meeting Schedule
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/meeting-admin/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <VideoOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Meeting List
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/create-meeting/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <MessageVideo />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Create Meeting
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-meeting/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <VideoOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Change Meeting
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/meeting-admin-detail/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <VideoOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Meeting Detail
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/people/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Members
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/add-people/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Add Members
            </Typography>
          </Box>
        ) : null}
        {route.asPath.indexOf('/edit-people/') !== -1 ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountGroupOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Edit Members
            </Typography>
          </Box>
        ) : null}
        {route.asPath === '/account-settings/' ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2, marginLeft: 2 }}
          >
            <AccountOutline />
            <Typography variant='h6' sx={{ marginLeft: 3 }}>
              Account Settings
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  )
}



export default AppBarContent
