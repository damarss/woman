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
import SendIcon from '@mui/icons-material/Send'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

const CardCommentPageTask = () => {
  return (
    <Card>
      <CardHeader title='Private Comment' sx={{ textAlign: 'center', backgroundColor: 'primary.main', paddingY: 3 }} />
      <CardContent>
        {/* box buat komentar*/}
        <Box sx={{ maxHeight: '30vh', minHeight: '30vh', overflowY: 'scroll', marginY: 2 }}>
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
        </Box>
        <FormControl fullWidth>
          <InputLabel htmlFor='send-icon'>Add Private Comment...</InputLabel>
          <OutlinedInput
            label='Private comment...'
            id='send-icon'
            // onChange={handleConfirmChange('password2')}
            // type={values.showPassword2 ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  // aria-label='toggle password visibility'
                  // onClick={handleClickShowConfirmPassword}
                  // onMouseDown={handleMouseDownConfirmPassword}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </CardContent>
      <CardActions className='card-action-dense'>
        {/* <Button>Location</Button>
        <Button>Reviews</Button> */}
      </CardActions>
    </Card>
  )
}

export default CardCommentPageTask
