// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Demo Components Imports
import CardUser from 'src/views/cards/CardUser'
import CardImgTop from 'src/views/cards/CardImgTop'
import CardMobile from 'src/views/cards/CardMobile'
import CardSupport from 'src/views/cards/CardSupport'
import CardTwitter from 'src/views/cards/CardTwitter'
import CardFacebook from 'src/views/cards/CardFacebook'
import CardLinkedIn from 'src/views/cards/CardLinkedIn'
import CardAppleWatch from 'src/views/cards/CardAppleWatch'
import CardMembership from 'src/views/cards/CardMembership'
import CardInfluencer from 'src/views/cards/CardInfluencer'
import CardNavigation from 'src/views/cards/CardNavigation'
import CardWithCollapse from 'src/views/cards/CardWithCollapse'
import CardVerticalRatings from 'src/views/cards/CardVerticalRatings'
import CardNavigationCenter from 'src/views/cards/CardNavigationCenter'
import CardHorizontalRatings from 'src/views/cards/CardHorizontalRatings'
import CardProject from 'src/views/cards/CardProject'
import CardProjectdetail from 'src/views/cards/CardProjectdetail'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import Tableprojectdetail from 'src/views/tables/Tableprojectdetail'

// third party import
import Swal from 'sweetalert2'

const CardBasic = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <CardProjectdetail />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} alignItems="center" justify="center">
        <Button sx={{height: '100%'}} fullWidth href='/create-project-task' type='submit' variant='contained' color='primary'>
            Add Task
        </Button>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Tableprojectdetail />
      </Grid>

      {/* Admin */}
      <Grid item xs={12} sm={12} md={12}>
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <Button
            size='medium'
            type='submit'
            sx={{ mr: 7 }}
            variant='contained'
            color='primary'
            onClick={() => {
              Swal.fire({
                title: 'Hapus Project?',
                text: 'Tekan tombol "Hapus Project" untuk mengirim notifikasi kepada peserta Project',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#68B92E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Hapus Project',
                cancelButtonText: 'Tidak, Kembali',
                reverseButtons: true
              }).then(result => {
                if (result.isConfirmed) {
                  Swal.fire('', 'Project berhasil dihapus. Tekan "OK" untuk melanjutkan.', 'success')
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  Swal.fire('Cancelled!', 'Project tidak dihapus. Tekan "OK" untuk melanjutkan.', 'error')
                }
              })
            }}
          >
            Delete
          </Button>
          <Button href='/edit-project' size='medium' type='submit' variant='contained' color='primary'>
            Update
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default CardBasic
