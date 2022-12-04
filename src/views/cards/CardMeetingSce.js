// ** React Imports
import { useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'
import ClockOutline from 'mdi-material-ui/ClockOutline'

const CardSupport = props => {
  
  const router = useRouter()
  let date
  let time
  let link
  let title
  if (props.meet) {
    date = new Date(props.meet.date).toLocaleDateString()
    time = new Date(props.meet.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    link = props.meet.link
    title = props.meet.title
  } else {
    date = 'No Upcoming Meeting'
  }
  const routeTo = async () => {
    router.push(`/meeting-admin-detail/${props.meet.id}`)
  }

  return (
    <Card sx={{ minHeight: 300 }}>
      {date !== 'No Upcoming Meeting' ? (
        <a style={{ textDecoration: 'none', display: 'flex', justifyContent: 'end', margin: 10 }}>
          <Avatar onClick={routeTo}
            sx={{cursor: 'pointer', width: 30, height: 30, marginBottom: 0, color: 'common.white', backgroundColor: 'primary.main' }}
          >
            <InformationOutline sx={{ fontSize: '2rem' }} />
          </Avatar>
        </a>
      ) : null}
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: `${props.meet ? 200 : 300}px`,
          padding: theme => `${props.meet ? theme.spacing(0, 0, 9.25) : theme.spacing(0, 0, 0)} !important`
        }}
      >
        <Avatar
          sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <ClockOutline sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='body2' sx={{ marginBottom: 2.75 }}>
          {date}
        </Typography>
        <Typography variant='h4' sx={{ marginBottom: 2.75 }}>
          {time}
        </Typography>
        <Typography variant='h6' sx={{ marginBottom: 6}}>
          {title}
        </Typography>
        <a style={{ textDecoration: 'none', display: date !== 'No Upcoming Meeting' ? 'block' : 'none' }} href={link}>
          <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
            Join Meeting
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}

export default CardSupport
