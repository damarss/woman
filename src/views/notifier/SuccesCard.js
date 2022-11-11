// ** MUI Imports
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'

// ** Icons Imports
import CheckCircle from 'mdi-material-ui/CheckCircle'

const SuccesCard = props => {
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
        <Avatar
          sx={{ width: 50, height: 50, marginBottom: 2.25, color: 'common.white', backgroundColor: 'primary.main' }}
        >
          <CheckCircle sx={{ fontSize: '2rem' }} />
        </Avatar>
        <Typography variant='body2' sx={{ marginBottom: 6 }}>
          {/* {item.description} */}
        </Typography>
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          OK
        </Button>
      </CardContent>
    </Card>
  )
}

export default SuccesCard
