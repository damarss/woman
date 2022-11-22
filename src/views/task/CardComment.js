// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import CardComment from 'src/views/task/CardComment'
// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import CardActions from '@mui/material/CardActions'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

// Pendefinisian warna untuk status progress task
const statusObj = {
  assigned: { color: 'secondary' },
  on_progress: { color: 'info' },
  turned_in: { color: 'warning' },
  revision: { color: 'primary' },
  done: { color: 'success' },
  late: { color: 'error' },
  turned_in_late: { color: 'warning' },
  done_late: { color: 'success' }
}

const CardCommentPageTask = () => {
  return (
    <Card>
      <CardHeader title='Private Comment' sx={{ textAlign: 'center', backgroundColor: 'primary.main', paddingY: 3 }} />
      <CardContent>
        {/* <Divider sx={{ marginBottom: 6.75 }} /> */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 3 }}>
          <Avatar alt='Eugene Clarke' src='/images/avatars/1.png' sx={{ width: 50, height: 50, marginRight: 2.75 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1' sx={{ textAlign: 'left' }}>
              Eugene Clarke
            </Typography>
            <Typography variant='body2' sx={{}}>
              If you are looking for a new way to promote your business that won’t cost you more money, maybe printing
              is one of the options you won’t resist.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 3 }}>
          <Avatar alt='Eugene Clarke' src='/images/avatars/1.png' sx={{ width: 50, height: 50, marginRight: 2.75 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1' sx={{ textAlign: 'left' }}>
              Eugene Clarke
            </Typography>
            <Typography variant='body2' sx={{}}>
              If you are looking for a new way to promote your business that won’t cost you more money, maybe printing
              is one of the options you won’t resist.
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions className='card-action-dense'>
        {/* <Button>Location</Button>
        <Button>Reviews</Button> */}
      </CardActions>
    </Card>
  )
}

export default CardCommentPageTask
