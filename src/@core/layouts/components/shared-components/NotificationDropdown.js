// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

// ** Icons Imports
import BellOutline from 'mdi-material-ui/BellOutline'

import { getSession, useSession } from 'next-auth/react'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import axios from 'src/pages/api/axios'

// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const NotificationDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState([])

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))
  const session = useSession()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  const handleRead = async id => {
    if (session.status === 'authenticated') {
      const res = await axios.put(`notification/${id}`, {
        userId: session?.data?.uid
      })

      if (res.status === 200) {
        getNotifications()
      }
    }

    handleDropdownClose()
  }

  const handleReadAll = async () => {
    if (session.status === 'authenticated') {
      const res = await axios.put('notification', {
        userId: session?.data?.uid
      })

      if (res.status === 200) {
        getNotifications()
      }
    }

    handleDropdownClose()
  }

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }

  const getNotifications = async () => {
    const res = await axios.get(`notification?userid=${session?.data?.uid}`)
    setNotifications(res.data.filter(notification => !notification.isRead))
  }

  const boxSX = {
    '&:hover': {
      color: 'black',
      backgroundColor: '#EB891B'
    },
    backgroundColor: '#EB891B',
    color: 'white'
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      console.log(session)
      getNotifications()
    }
  }, [session])

  return (
    <Fragment>
      {notifications.length > 0 ? (
        <IconButton sx={boxSX} aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <NotificationsActiveIcon />
        </IconButton>
      ) : (
        <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
          <BellOutline />
        </IconButton>
      )}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={notifications.length > 0 ? `${notifications.length} New` : 'No New'}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <MenuItem key={notification.id} onClick={e => handleRead(notification.id)}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ color: 'common.white', backgroundColor: 'primary.main' }}>{notification.type}</Avatar>
                  <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                    <MenuItemTitle>{notification.title}</MenuItemTitle>
                    <MenuItemSubtitle variant='body2'>{notification.message}</MenuItemSubtitle>
                  </Box>
                  <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem disableRipple>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <Box sx={{ ml: 2 }}>
                  <MenuItemTitle>No new notifications</MenuItemTitle>
                  <MenuItemSubtitle>Check back later</MenuItemSubtitle>
                </Box>
              </Box>
            </MenuItem>
          )}
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          {notifications.length > 0 && (
            <Button fullWidth variant='contained' onClick={handleReadAll}>
              Read All Notifications
            </Button>
          )}
        </MenuItem>
      </Menu>
    </Fragment>
  )
}

export default NotificationDropdown
