//  ** React
import { useState } from 'react'

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

import DragAndDrop from 'src/views/task/DragAndDrop'
import { color } from '@mui/system'

const CardTaskFileContent = props => {
  const [isFile, setIsFile] = useState(true)
  console.log(props.userInfo.task.userId)

  return (
    <Card>
      <CardHeader title={props.title} sx={{ textAlign: 'center', backgroundColor: 'primary.main', paddingY: 3 }} />
      <CardContent sx={{ textAlign: 'center' }}>
        {/* BUAT UPLOAD FILE */}
        <DragAndDrop />

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
        {/* <Typography variant='body2' sx={{ textColor: 'warning', marginTop: 4 }}>
          Need Revision
        </Typography>
        <InsertDriveFileIcon fontSize='large' sx={{ height: '15vh' }} />
        <Typography variant='body2'>File name</Typography>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
          Resubmit
        </Button> */}

        {/* ADMIN */}

        {/* Jika Belum Ada File Submit */}
        {/* <Typography variant='body2' sx={{ marginTop: 20, marginBottom: 15 }} style={{ display: isFile ? 'none' : 'block' }}>
            No submitted file.
          </Typography> */}

        {/* Jika Sudah Ada File Submit */}
        <br></br>
        {/* <Link href='#' sx={{ color: '#171717' }} className='FileResult'>
          <InsertDriveFileIcon fontSize='large' sx={{ height: '15vh', fontSize: 50, marginTop: 1 }} />
          <Typography sx={{ marginBottom: 5 }} variant='body2'>
            File name
          </Typography>
        </Link>
        
        <Divider sx={{ marginTop: 10, marginBottom: 6.75 }} /> */}

        <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
        {props.userInfo.idUser === props.userInfo.task.userId  && (
          <Button
            type='submit'
            variant='contained'
            sx={{ padding: theme => theme.spacing(1.75, 5.5) }}
            style={{ marginRight: 3 }}
          >
            Revise
          </Button>)}
          {props.userInfo.idUser === props.userInfo.task.project.projectLeaderId  && (
          <Button type='submit' variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }}>
            Accept
          </Button>)}
        </Box>
      </CardContent>
      <CardActions className='card-action-dense'>
        {/* <Button>Location</Button>
        <Button>Reviews </Button> */}
      </CardActions>
    </Card>
  )
}

export default CardTaskFileContent
