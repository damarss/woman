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

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardMembership = props => {
  const [listName, setListName] = useState('')
  useEffect(() => {
    const list = []
    props.data.UserMeet.map(row => list.push(row.user.name));
    setListName(list.join(" , "));
  },[])
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
                <Typography variant='body2'>Meeting End</Typography>
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
              <Typography variant='body2'>{props.data.startDate}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{props.data.endDate}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{props.data.description}</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{props.data.link}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>{listName}</Typography>
            </Box>
          </Grid>
        </Grid>
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
          <Link href='/edit-meeting'>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Edit
            </Button>
          </Link>
          <Button
            size='large'
            type='submit'
            sx={{ mr: 2 }}
            variant='contained'
            onClick={() => {
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
                  Swal.fire('', 'Rapat berhasil dihapus. Tekan "OK" untuk melanjutkan.', 'success')
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  Swal.fire('Cancelled!', 'Rapat tidak dihapus. Tekan "OK" untuk melanjutkan.', 'error')
                }
              })
            }}
          >
            Delete
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default CardMembership
