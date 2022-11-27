// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
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
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

const CardTaskFileContent = () => {
  return (
    <Card>
      <CardHeader title='Your Work' sx={{ textAlign: 'center', backgroundColor: 'primary.main', paddingY: 3 }} />
      <CardContent sx={{ textAlign: 'center' }}>
        {/* <Typography variant='body2' sx={{ marginBottom: 6 }}>
          No submitted file
        </Typography>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} /> */}

        {/* BUAT UPLOAD FILE */}
        {/* <Typography variant='body2' sx={{ marginTop: 6 }}>
          No submitted file.
          <br /> Drop your file here or
        </Typography>
        <>
          <input
            accept='image/*'
            className='test'
            style={{ display: 'none' }}
            id='raised-button-file'
            multiple
            type='file'
          />
          <label htmlFor='raised-button-file'>
            <Button variant='raised' component='span'>
              Upload
            </Button>
          </label>
        </>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} /> */}

        {/* JIKA FILE SUDAH ADA */}
        {/* <InsertDriveFileIcon fontSize='large' sx={{ height: '20vh' }} />
        <Typography variant='body2'>File name</Typography>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Submit
        </Button> */}

        {/* JIKA FILE SUDAH TURNED IN */}
        {/* <Typography variant='body2' sx={{ marginTop: 4 }}>
          Being Reviewed
        </Typography>
        <InsertDriveFileIcon fontSize='large' sx={{ height: '15vh' }} />
        <Typography variant='body2'>File name</Typography>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Unsubmit
        </Button> */}

        {/* JIKA BUTUH REVISI */}
        <Typography variant='body2' sx={{ textColor: 'warning', marginTop: 4 }}>
          Need Revision
        </Typography>
        <InsertDriveFileIcon fontSize='large' sx={{ height: '15vh' }} />
        <Typography variant='body2'>File name</Typography>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Resubmit
        </Button>
      </CardContent>
      <CardActions className='card-action-dense'>
        {/* <Button>Location</Button>
        <Button>Reviews </Button> */}
      </CardActions>
    </Card>
  )
}

export default CardTaskFileContent
