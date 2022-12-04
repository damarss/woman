// ** React Imports
import { forwardRef, useState } from 'react'

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
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import CardActions from '@mui/material/CardActions'


// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'

const statusObj = {
  0: { color: 'secondary', status: 'Assigned' },
  1: { color: 'info', status: 'On Progress' },
  2: { color: 'warning', status: 'Turned In' },
  3: { color: 'primary', status: 'Revision' },
  4: { color: 'success', status: 'Done' },
  5: { color: 'error', status: 'Late' },
  6: { color: 'warning', status: 'Turned In Late' },
  7: { color: 'success', status: 'Done Late' }
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: 370,
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Deadline' autoComplete='on' />
})

const TaskDetailPage = props => {
  const [date, setDate] = useState(null)
  const session = useSession()

  const [Open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Grid>
      {/* biar ada bg putih */}
      <Card>
        <Grid container spacing={5} padding={5}>
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
                {props.task.task.title}
              </Typography>
              <Chip
                label={statusObj[props.task.task.status].status} //fungsi getLabelStatus ini buatan sendiri, fungsinya ada di bawah
                //   color={statusObj['row.status'].color}
                color={statusObj[(props.task.task.status)].color} //kalau mau ganti backgroud status task tinggal ganti 'on_progress' dengan status task
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
              {new Date(props.task.task.duedate).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
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
              {props.task.task.description}
            </Grid>
          </Grid>
          <Grid container xs={12} sx={{ marginX: 5, marginTop: 5 }} spacing={6}>
            <Grid item xs={12} md={8} lg={8} sx={{ paddingLeft: 0 }}>
              <CardComment comments={props.task} />
            </Grid>
            <Grid item xs={12} md={4} lg={4} sx={{ paddingLeft: 0 }}>
              <CardTaskFile title='Result' userInfo={props.task}/>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export default TaskDetailPage
