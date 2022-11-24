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
import CardTaskFile from 'src/views/task/CardTaskFile'
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
    <Grid>
      {/* biar ada bg putih */}
      <Card>
        <Grid container spacing={5}>
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
                label={getLabelStatus('on_progress')} //fungsi getLabelStatus ini buatan sendiri, fungsinya ada di bawah
                //   color={statusObj['row.status'].color}
                color={statusObj['on_progress'].color} //kalau mau ganti backgroud status task tinggal ganti 'on_progress' dengan status task
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
          <Grid item container xs={12} sx={{ marginX: 5, marginTop: 5 }} spacing={6}>
            <Grid item xs={9} sx={{ paddingRight: 5 }}>
              <CardComment />
            </Grid>
            <Grid item xs={3}>
              <CardTaskFile />
            </Grid>
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
