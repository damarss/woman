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

const TaskDetailPage = props => {
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
              <CardTaskFile title='Result'/>
            </Grid>
          </Grid>
          {/* Admin */}
          <Grid item container xs={12} sm={12} md={12} sx={{ marginX: 5, marginTop: 2, marginBottom: 8 }}>
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
                        <Button size='large' color='secondary' sx={{ mr: 2 }} variant='outlined' onClick={handleClose}>
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
