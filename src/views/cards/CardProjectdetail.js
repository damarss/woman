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

const CardNavigation = () => {
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
          <Tab value='1' label='Project Detail' />
          <Tab value='2' label='Timeline' />
          <Tab value='3' label='Project Description' />
        </TabList>
        <CardContent>
          <TabPanel value='1' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
             Project Detail
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2 }}>
             Created by : A on A 
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2 }}>
             Project Participant: 20
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2 }}>
             Tasks: 90
            </Typography>
          </TabPanel>
          <TabPanel value='2' sx={{ p: 0 }}>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ mb: 1, flexdirection:'row', display: 'column',justifyContent:'center', alignItems: 'center',textAlign: 'left',color:'success.main' }}>
                    <Typography variant='body2'>Date Started</Typography>
                    <Typography variant='body2'>Date</Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ mb: 1,flexdirection:'row', display: 'column',justifyContent:'center', alignItems: 'center',textAlign: 'left' }}>
                  <Typography variant='body2' >Date Finished</Typography>
                  <Typography variant='body2' >Date</Typography>
                </Box>
              </Grid>
            </Grid>
            <Divider sx={{ marginTop: 2.2, marginBottom: 2.2 }} />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={5}>
                <StyledBox>
                  <Box sx={{ mb: 1, flexdirection:'row', display: 'column',justifyContent:'center', alignItems: 'center',textAlign: 'left' }}>
                    <Typography variant='body2'>Time Left</Typography>
                    <Typography variant='body2'>3 Hours</Typography>
                  </Box>
                </StyledBox>
              </Grid>
              <Grid item xs={12} sm={7}>
                <Box sx={{ mb: 1,flexdirection:'row', display: 'column',justifyContent:'center', alignItems: 'center',textAlign: 'left' }}>
                  <Typography variant='body2' >Duration</Typography>
                  <Typography variant='body2' >4 Day 2 Hours</Typography>
                </Box>
              </Grid>
            </Grid>
            </Typography>
          </TabPanel>
          <TabPanel value='3' sx={{ p: 0 }}>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Project Descriptions
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              Project Description: "kaowkoawkoakwoakwokawokaowkoakwoakwoakwoakwowakoawkoawkoawkoawkoa
              wkawokawawkkaowkalwkalwklawklakoakoawkoawkowakoawkoawkoawkoawkoawkawo
              awkoakwokawo"
            </Typography>
          </TabPanel>
        </CardContent>
      </TabContext>
    </Card>
  )
}

export default CardNavigation