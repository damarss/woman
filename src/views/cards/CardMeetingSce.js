// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import ClockOutline from 'mdi-material-ui/ClockOutline'

const CardSupport = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: 300,
          padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <Avatar
          sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <ClockOutline sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='body2' sx={{ marginBottom: 2.75 }}>
          12-11-2022
        </Typography>
        <Typography variant='h2' sx={{ marginBottom: 6 }}>
          10:00
        </Typography>
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Join Meeting
        </Button>
      </CardContent>
    </Card>
  )
}

export default CardSupport
