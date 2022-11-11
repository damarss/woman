// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

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
import CardProject from 'src/views/cards/CardProject'

const Project = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>My Project</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <CardProject />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardProject />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardProject />
      </Grid>
      <Grid item xs={12} md={6}>
        <CardProject />
      </Grid>
    </Grid>
  )
}

export default Project
