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

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardMembership = () => {
  return (
    <Card>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
        <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
          Meeting Title
        </Typography>
        <br></br>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <StyledBox>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Date</Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Meeting Start</Typography>
              </Box>
              <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2'>Meeting Duration</Typography>
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
              <Typography variant='body2'>22/12/2022</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>09:00</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>1 Hour</Typography>
            </Box>
            <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>https:/zooom.us</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2'>Roger, Goerge, Philip, Elizabeth</Typography>
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
              // Swal.fire({
              //   title: 'Hapus Rapat?',
              //   text: 'Tekan tombol "Buat Rapat" untuk mengirim notifikasi kepada peserta rapat',
              //   icon: 'warning',
              //   showCancelButton: true,
              //   confirmButtonColor: '#3085d6',
              //   cancelButtonColor: '#d33',
              //   confirmButtonText: 'Ya, Hapus Rapat'
              // }).then((result) => {
              //   if (result.isConfirmed) {
              //     Swal.fire(
              //       '',
              //       'Rapat berhasil dihapus. Tekan "OK" untuk melanjutkan.',
              //       'success'
              //     )
              //   }
              // })

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
