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
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import axios from 'src/pages/api/axios'

const CardTaskFileContent = props => {
  const [isFile, setIsFile] = useState(true)

  const session = useSession()

  const router = useRouter()

  // const handleUnsubmit = async e => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this file!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33'
  //   }).then(async result => {
  //     if (result.isConfirmed) {
  //       await axios
  //         .put(`task/${props.taskId}`, { status: 1, helper: 'resubmit' })
  //         .then(res => {
  //           if (res.status === 200) {
  //             router.reload()
  //           }
  //         })
  //         .catch(err => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: 'Something went wrong!'
  //           })
  //         })

  //       Swal.fire('Unsubmitted!', 'Your work has been unsubmitted.', 'success')
  //     }
  //   })
  // }

  const handleRevise = async e => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'User will be notified!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.isConfirmed) {
        axios
          .put(`task/${props.userInfo.task.id}`, {
            status: 3,
            helper: 'revise'
          })
          .then(res => {
            Swal.fire('Revised!', 'User has been notified.', 'success')
            router.back()
          })
          .catch(err => {
            Swal.fire('Error', 'Something went wrong.', 'error')
          })
      }
    })
  }

  const handleAccept = async e => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'User will be notified!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(async result => {
      if (result.isConfirmed) {
        axios
          .put(`task/${props.userInfo.task.id}`, {
            status: 4,
            helper: 'accept'
          })
          .then(res => {
            Swal.fire('Accepted!', 'User has been notified.', 'success')
            router.back()
          })
          .catch(err => {
            Swal.fire('Error', 'Something went wrong.', 'error')
          })
      }
    })
  }

  const handleUnsubmit = async e => {
    e.preventDefault()

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to undo this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .put(`task/${props.userInfo.task.id}`, {
            status: 1,
            helper: 'unsubmit'
          })
          .then(async res => {
            await Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Task unsubmitted'
            })

            router.reload()
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong'
            })
          })
      }
    })
  }

  let button
  if (props.userInfo.task.status === 0) {
    button = <DragAndDrop task={props.userInfo} />
  } else if (
    props.userInfo.task.status === 1 ||
    props.userInfo.task.status === 2 ||
    props.userInfo.task.status === 4 ||
    props.userInfo.task.status === 5 ||
    props.userInfo.task.status === 6 ||
    props.userInfo.task.status === 7
  ) {
    button = (
      <Box>
        <Typography variant='body2' sx={{ marginTop: 4 }}>
          {props.userInfo.task.status === 1
            ? 'Being Reviewed'
            : props.userInfo.task.status === 2
            ? 'Submitted'
            : props.userInfo.task.status === 4
            ? 'Accepted'
            : props.userInfo.task.status === 5
            ? 'Rejected'
            : props.userInfo.task.status === 6
            ? 'Completed'
            : 'Revise'}
        </Typography>
        <InsertDriveFileIcon fontSize='large' sx={{ height: '15vh' }} />
        <Typography variant='body2'>{props.userInfo.task.taskfile}</Typography>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />

        {session.status === 'authenticated' && session.data.uid == props.userInfo.task.userId && (
          <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }} onClick={handleUnsubmit}>
            Unsubmit
          </Button>
        )}
      </Box>
    )
  } else if (props.userInfo.task.status === 3) {
    button = (
      <Box>
        <Typography variant='body2' sx={{ textColor: 'warning', marginTop: 4 }}>
          Need Revision
        </Typography>
        <InsertDriveFileIcon fontSize='large' sx={{ height: '15vh' }} />
        <Typography variant='body2'>{props.userInfo.task.taskfile}</Typography>
        <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
        <Button variant='contained' sx={{ padding: theme => theme.spacing(1.75, 5.5) }} onClick={handleUnsubmit}>
          Resubmit
        </Button>
      </Box>
    )
  } else {
    button = <Box>Not Found</Box>
  }

  return (
    <Card>
      <CardHeader title={props.title} sx={{ textAlign: 'center', backgroundColor: 'primary.main', paddingY: 3 }} />
      <CardContent sx={{ textAlign: 'center' }}>
        {button}
        {/* BUAT UPLOAD FILE */}
        {/* <DragAndDrop /> */}

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

        {/* <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
          {button}
        </Box> */}

        {(props.userInfo.idUser === props.userInfo.task.project.projectLeaderId ||
          (session.status === 'authenticated' && session.data.uid == 1)) && (
          <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              type='submit'
              variant='contained'
              sx={{ padding: theme => theme.spacing(1.75, 5.5) }}
              style={{ marginRight: 3 }}
              onClick={handleRevise}
            >
              Revise
            </Button>
            <Button
              type='submit'
              variant='contained'
              sx={{ padding: theme => theme.spacing(1.75, 5.5) }}
              onClick={handleAccept}
            >
              Accept
            </Button>
          </Box>
        )}
      </CardContent>
      <CardActions className='card-action-dense'></CardActions>
    </Card>
  )
}

export default CardTaskFileContent
