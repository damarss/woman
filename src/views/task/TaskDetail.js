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
import CardComment from 'src/views/task/CardComment'
// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// Styled Box component
const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

// Pendefinisian warna untuk status progress task
const statusObj = {
  assigned: { color: 'secondary' },
  on_progress: { color: 'info' },
  turned_in: { color: 'warning' },
  revision: { color: 'primary' },
  done: { color: 'success' },
  late: { color: 'error' },
  turned_in_late: { color: 'warning' },
  done_late: { color: 'success' }
}

const TaskDetailPage = () => {
  return (
    <Grid xs={12}>
      {/* biar ada bg putih */}
      <Card>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box
              sx={{
                gap: 5,
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingX: 5
              }}
            >
              <Typography variant='h6' sx={{ marginY: 2.5 }}>
                Task Title
              </Typography>
              <Chip
                label={getLabelStatus('on_progress')}
                //   color={statusObj['row.status'].color}
                color='info'
                sx={{
                  height: 24,
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { fontWeight: 500 }
                }}
              />
            </Box>
          </Grid>
          <Grid item container xs={12} sx={{ marginX: 5 }}>
            <Grid item xs={12} sm={2}>
              Deadline
            </Grid>
            <Grid item xs={12} sm={10}>
              21 November 2022
            </Grid>
          </Grid>
          <Grid item container xs={12} sx={{ marginX: 5 }}>
            <Grid item xs={12} sm={2}>
              Priority
            </Grid>
            <Grid item xs={12} sm={10}>
              High
            </Grid>
          </Grid>
          <Grid item container xs={12} sx={{ marginX: 5 }}>
            <Grid item xs={12} sm={2}>
              Description
            </Grid>
            <Grid item xs={12} sm={10}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu metus nisi. Nunc ac enim ligula.
              Suspendisse est nibh, condimentum vulputate ullamcorper vitae, convallis sit amet tellus. Ut faucibus erat
              tempus lectus elementum fringilla. Integer sollicitudin dui nec purus laoreet pellentesque. Aenean varius
              tincidunt felis vitae luctus. Ut nulla nibh, euismod et libero id, ullamcorper lacinia lacus. Aenean
              auctor urna ac placerat tempor. Pellentesque rutrum sed arcu ac luctus. Etiam pulvinar nec nulla ac
              lacinia. Morbi nec facilisis massa.
            </Grid>
          </Grid>
          <Grid item container xs={8}>
            <CardComment />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default TaskDetailPage

function getLabelStatus(status) {
  switch (status) {
    case 'assigned':
      return 'Assigned'
      break
    case 'on_progress':
      return 'On Progress'
      break
    case 'turned_in':
      return 'Turned In'
      break
    case 'revision':
      return 'Revision'
      break
    case 'done':
      return 'Done'
      break
    case 'late':
      return 'Late'
      break
    case 'turned_in_late':
      return 'Turned In Late'
      break
    case 'done_late':
      return 'Done Late'
      break
    default:
      break
  }
}
{
  /* <Card>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={7}>
            <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5.75, 6.25)} !important` }}>
              <Typography variant='h6' sx={{ marginBottom: 3.5 }}>
                Lifetime Membership
              </Typography>
              <Typography variant='body2'>
                Here, I focus on a range of items and features that we use in life without giving them a second thought
                such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not
                fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for
                picking up women or men.
              </Typography>
              <Divider sx={{ marginTop: 6.5, marginBottom: 6.75 }} />
              <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                  <StyledBox>
                    <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                      <LockOpenOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                      <Typography variant='body2'>Full Access</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccountOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                      <Typography variant='body2'>15 Members</Typography>
                    </Box>
                  </StyledBox>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Box sx={{ mb: 6.75, display: 'flex', alignItems: 'center' }}>
                    <StarOutline sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Access all Features</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ color: 'primary.main', marginRight: 2.75 }} fontSize='small' />
                    <Typography variant='body2'>Lifetime Free Update</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
          <Grid
            item
            sm={5}
            xs={12}
            sx={{
              paddingTop: ['0 !important', '1.5rem !important'],
              paddingLeft: ['1.5rem !important', '0 !important']
            }}
          >
            <CardContent
              sx={{
                height: '100%',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'action.hover',
                padding: theme => `${theme.spacing(18, 5, 16)} !important`
              }}
            >
              <Box>
                <Box sx={{ mb: 3.5, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Typography variant='h6'>$</Typography>
                  <Typography variant='h6' sx={{ lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important' }}>
                    899
                  </Typography>
                  <Typography variant='h6'>USD</Typography>
                </Box>
                <Typography variant='body2' sx={{ mb: 13.75, display: 'flex', flexDirection: 'column' }}>
                  <span>5 Tips For Offshore</span>
                  <span>Software Development</span>
                </Typography>
                <Button variant='contained'>Contact Now</Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card> */
}
