// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'

import CardContent from '@mui/material/CardContent'
import { Avatar } from '@mui/material'

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

const CardNavigation = props => {
  // ** State
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const StyledBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }))

  return (
    <Card>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label='card navigation example'>
          <Tab value='1' label='Info' />
          <Tab value='2' label='Timeline' />
          <Tab value='3' label='Description' />
          <Tab value='4' label='Participants' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {props.project.title}
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2, fontWeight: '600' }}>
              Team Leader : {props.project.projectLeader.name}
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2, fontWeight: '600' }}>
              Project Participants: {props.project.UserProject.length}
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2, fontWeight: '600' }}>
              Tasks: {props.project.Task.length}
            </Typography>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                  <StyledBox>
                    <Box
                      sx={{
                        mb: 1,
                        flexdirection: 'row',
                        display: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'left',
                        color: 'success.main'
                      }}
                    >
                      <Typography variant='body1'>Date Started</Typography>
                      <Typography variant='body2'>
                        {new Date(props.project.startdate).toLocaleDateString('id')}
                      </Typography>
                    </Box>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Box
                    sx={{
                      mb: 1,
                      flexdirection: 'row',
                      display: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'left'
                    }}
                  >
                    <Typography variant='body1'>Date Finished</Typography>
                    <Typography variant='body2'>{new Date(props.project.enddate).toLocaleDateString('id')}</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ marginTop: 2.2, marginBottom: 2.2 }} />
              <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                  <StyledBox>
                    <Box
                      sx={{
                        mb: 1,
                        flexdirection: 'row',
                        display: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'left'
                      }}
                    >
                      <Typography variant='body1'>Time Left</Typography>
                      <Typography variant='body2'>
                        {Math.ceil((new Date(props.project.enddate) - new Date()) / (1000 * 3600 * 24)) >= 0
                          ? `${Math.ceil((new Date(props.project.enddate) - new Date()) / (1000 * 3600 * 24))} days`
                          : 'Project has been finished'}
                      </Typography>
                    </Box>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Box
                    sx={{
                      mb: 1,
                      flexdirection: 'row',
                      display: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'left'
                    }}
                  >
                    <Typography variant='body1'>Duration</Typography>
                    <Typography variant='body2'>
                      {Math.ceil((new Date() - new Date(props.project.startdate)) / (1000 * 3600 * 24))} days
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Project Descriptions
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4, height: 80, overflowY: 'scroll' }}>
              {props.project.description}
            </Typography>
          </TabPanel>
          <TabPanel value='4' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Project Participants
            </Typography>
            <Typography
              variant='body2'
              sx={{ marginBottom: 4, height: 80, overflowY: 'scroll', display: 'flex', gap: 2, flexWrap: 'wrap' }}
            >
              {props.project.UserProject.map((user, index) => (
                <div key={index}>
                  <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ color: 'common.white', backgroundColor: 'primary.main' }}>
                      {user.user.name.slice(0, 1)}
                    </Avatar>
                    <Box sx={{ mx: 3, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                      <MenuItemTitle>{user.user.name}</MenuItemTitle>
                    </Box>
                  </Box>
                </div>
              ))}
            </Typography>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardNavigation
