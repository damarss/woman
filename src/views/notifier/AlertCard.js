// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

// ** Icons Imports
import Alert from 'mdi-material-ui/Alert'

const AlertCard = props => {
  const { item } = props

  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <Typography variant='h6' sx={{ marginBottom: 2.75 }}>
          {/* {item.title} */}
        </Typography>
        <Avatar
          sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <Alert sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='body2' sx={{ marginBottom: 6 }}>
          {/* {item.description} */}
        </Typography>
        <Box sx={{display: 'flex', justifiContent: 'center'}}>
          <Button style={{marginRight: 10}} color='secondary' variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
            Kembali
          </Button>
          <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
            {/* {item.action} */}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default AlertCard
