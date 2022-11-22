// ** MUI Imports
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Link from '@mui/material/Link'

// third party import
import Swal from 'sweetalert2'

// ** Icons Imports
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'

const CardSupport = () => {
  return (
    <Card>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'left',
          flexDirection: 'column',
          padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <Typography variant='h4' sx={{ marginBottom: 10 }}>
          Meeting Title
        </Typography>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography variant='body1' sx={{ marginBottom: 2 }}>
            Tanggal
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 2, marginLeft: 25 }}>
            22/12/2022
          </Typography>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography variant='body1' sx={{ marginBottom: 2 }}>
            Waktu Mulai
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 2, marginLeft: 17 }}>
            9:00
          </Typography>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography variant='body1' sx={{ marginBottom: 2 }}>
            Durasi
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 2, marginLeft: 28 }}>
            1 Jam
          </Typography>
        </Box>
        <Box sx={{display:'flex', alignItems:'center'}}>
          <Typography variant='body1' sx={{ marginBottom: 2 }}>
            Link
          </Typography>
          <Typography variant='body2' sx={{ marginBottom: 2, marginLeft: 33 }}>
            https:/zoom.us
          </Typography>
        </Box>
        <Box sx={{display:'flex', alignItems:'start'}}>
          <Typography variant='body1' sx={{ marginBottom: 2 }}>
            Peserta Rapat
          </Typography>
          <Box sx={{display:'flex', alignItems:'start', flexDirection:'column', }}>
            <Typography variant='body2' sx={{ marginBottom: 2, marginLeft: 13 }}>
              22/12/2022
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2, marginLeft: 13 }}>
              22/12/2022
            </Typography>
            <Typography variant='body2' sx={{ marginBottom: 2, marginLeft: 13 }}>
              22/12/2022
            </Typography>
          </Box>
        </Box>
        <CardActions style={{display:'flex', justifyContent:'end'}}>
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
                text: 'Tekan tombol "Buat Rapat" untuk mengirim notifikasi kepada peserta rapat',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#68B92E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Hapus Rapat',
                cancelButtonText: 'Tidak, Kembali',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    '',
                    'Rapat berhasil dihapus. Tekan "OK" untuk melanjutkan.',
                    'success'
                  )
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  Swal.fire(
                    '',
                    'Rapat tidak dihapus. Tekan "OK" untuk melanjutkan.',
                    'info'
                  )
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

export default CardSupport
