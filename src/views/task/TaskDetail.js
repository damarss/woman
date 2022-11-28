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

const rows = [
  {
    name: 'Abidin'
  },
  {
    name: 'Soleh'
  },
  {
    name: 'Umi'
  },
  {
    name: 'Lutpil'
  },
  {
    name: 'Mukidi'
  }
]

const TaskDetailPage = () => {
  const [date, setDate] = useState(null)

  const [Open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
            <Grid item xs={12} md={12} lg={9} sx={{ paddingRight: 5 }}>
              <CardComment />
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <CardTaskFile />
            </Grid>
          </Grid>
          {/* Admin */}
          <Grid item container xs={12} sm={12} md={12} sx={{ marginX: 10, marginBottom: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
              <Button
                size='medium'
                type='submit'
                sx={{ mr: 7 }}
                variant='contained'
                color='primary'
                onClick={() => {
                  Swal.fire({
                    title: 'Delete Task?',
                    text: 'Press "Delete Task" to delete this task and send notification to assigned person',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#68B92E',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, Delete Task',
                    cancelButtonText: 'No, Cancel',
                    reverseButtons: true
                  }).then(result => {
                    if (result.isConfirmed) {
                      Swal.fire('', 'Task is deleted succesfully. Press "OK" to continue.', 'success')
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      Swal.fire('Cancelled!', 'Task is not deleted. Press "OK" to continue.', 'error')
                    }
                  })
                }}
              >
                Delete
              </Button>
              <Button size='medium' type='submit' variant='contained' color='primary' onClick={handleOpen}>
                Update
              </Button>
              <Modal open={Open} onClose={handleClose}>
                <Card sx={style}>
                  {/* form edit task */}
                  <form onSubmit={e => e.preventDefault()}>
                    <CardContent>
                      <Typography variant='h6'>Update Task</Typography>
                      <br></br>
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={12} lg={6}>
                          <TextField fullWidth label='Task Title' placeholder='Task A' />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-separator-asigned-label-edit'>Asigned To</InputLabel>
                            <Select
                              label='asigned to'
                              defaultValue=''
                              id='form-layouts-separator-asigned'
                              labelId='form-layouts-separator-asigned-label-edit'
                            >
                              {rows.map(row => (
                                <MenuItem key={row.name} value={row.name}>
                                  {row.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                          <DatePickerWrapper>
                            <DatePicker
                              selected={date}
                              showYearDropdown
                              showMonthDropdown
                              showTimeSelect
                              placeholderText='DD-MM-YYYY, HH:MM'
                              dateFormat='Pp'
                              customInput={<CustomInput />}
                              id='tanggal-selesai'
                              onChange={date => setDate(date)}
                            />
                            </DatePickerWrapper>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={6}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-separator-priority-label-edit'>Priority</InputLabel>
                            <Select
                              label='priority'
                              defaultValue=''
                              id='form-layouts-separator-priority'
                              labelId='form-layouts-separator-priority-label-edit'
                            >
                              <MenuItem value='High'>High</MenuItem>
                              <MenuItem value='Medium'>Medium</MenuItem>
                              <MenuItem value='Low'>Low</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                          <TextField
                            fullWidth
                            multiline
                            minRows={5}
                            label='Task Description'
                            placeholder='Description'
                          />
                        </Grid>
                      </Grid>
                      <br></br>
                      <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button
                          size='large'
                          color='secondary'
                          sx={{ mr: 2 }}
                          variant='outlined'
                          onClick={handleClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          size='large'
                          type='submit'
                          sx={{ mr: 2 }}
                          variant='contained'
                          onClick={() => {
                            setOpen(false)
                            Swal.fire('', 'Task Updated Succesfully!', 'success')
                          }}
                        >
                          Update Task
                        </Button>
                      </CardActions>
                    </CardContent>
                  </form>
                  {/* end form edit task */}
                </Card>
              </Modal>
            </Box>
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
