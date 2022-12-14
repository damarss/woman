// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Link from '@mui/material/Link'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// third party import
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react'
import axios from 'src/pages/api/axios'
import { useRouter } from 'next/router'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const CardMembership = props => {
  const router = useRouter()
  let startDate
  let endDate
  let link
  if (props.data) {
    startDate = new Date(props.data.startDate).toLocaleDateString("en-EN", options) + " at " + new Date(props.data.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    endDate = new Date(props.data.endDate).toLocaleDateString("en-EN", options) + " at " + new Date(props.data.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    link = props.data.link
  } else {

  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Hapus Rapat?',
      text: 'Tekan tombol "Hapus Rapat" untuk mengirim notifikasi kepada peserta rapat',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus Rapat',
      cancelButtonText: 'Tidak, Kembali',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/meet/${props.data.id}`)
          .then(res => {
            Swal.fire('Deleted', 'Meeting has been deleted. Press "OK" to continue.', 'success')

            router.push('/meeting-admin')
          })
          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled!', 'Rapat tidak dihapus. Tekan "OK" untuk melanjutkan.', 'error')
      }
    })
  }

  const [listName, setListName] = useState('')
  useEffect(() => {
    const list = []
    props.data.UserMeet.map(row => list.push(row.user.name));
    setListName(list.join(" , "));
  }, [])

  return (
    <Card>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
        <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
          {props.data.title}
        </Typography>
        <br></br>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <StyledBox>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Meeting Start</Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Meeting End</Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Description</Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Link</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Participant</Typography>
              </Box>
            </StyledBox>
          </Grid>
          <Grid item xs={12} sm={7} md={8} lg={9}>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{startDate}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{endDate}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{props.data.description}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <a style={{ textDecoration: 'none' }} href={link}>
                <Typography variant='body2' sx={{color: 'blue'}}>{link}</Typography>
              </a>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{listName}</Typography>
            </Box>
          </Grid>
        </Grid>
        {props.role === 'admin' && (
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
            <Button 
            onClick={e => router.push(`/edit-meeting/${props.data.id}`)}
            size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Edit
            </Button>
          <Button
            size='large'
            type='submit'
            sx={{ mr: 2 }}
            variant='contained'
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardActions>)}
      </CardContent>
    </Card>
  )
}

export default CardMembership
