// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

// ** Icon
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'

const rows = [
  {
    name: 'Make Cakae inn',
    priority: 'highger',
    date: '22/12/2022',
    asigned: 'Humas Utama'
  },
  {
    priority: 'highn',
    date: '22/12/2022',
    name: 'Make Cakae  Bowers',
    asigned: 'Manajer'
  },
  {
    asigned: 'Divisi Umum',
    date: '22/12/2022',
    name: 'Make Cakae oy',
    priority: 'high'
  },
  {
    priority: 'highr admin',
    date: '22/12/2022',
    name: 'Make Cakae onard',
    asigned: 'Pencacah Utama'
  },
  {
    priority: 'high',
    date: '22/12/2022',
    name: 'Make Cakae rtin',
    asigned: 'Divisi TI'
  },
  {
    name: 'Make Cakae Day',
    priority: 'highger',
    date: '22/12/2022',
    asigned: 'Divisi IT'
  },
  {
    name: 'Make Cakae kson',
    date: '22/12/2022',
    priority: 'highger',
    asigned: 'Divisi Logistik'
  },
  {
    name: 'Make Cakae harp',
    priority: 'high',
    date: '22/12/2022',
    asigned: 'Divisi Umum'
  }
]

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='on' />
})

const CreateProjectTask = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {setOpen(false); Swal.fire('Cancelled', 'Task is not created!', 'error')}
  const [date, setDate] = useState(null)
  
  const [editOpen, setEditOpen] = useState(false)
  const handleEditOpen = () => setEditOpen(true)
  const handleEditClose = () => setEditOpen(false)

  return (
    <Card>
      <CardContent>
        <CardHeader title='Task Lists' titleTypographyProps={{ variant: 'h6' }} />
        <TableContainer>
          <Table sx={{ minWidth: 50 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell align='left' style={{ width: '18rem' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Task Name</Typography>
                </TableCell>
                <TableCell align='left' style={{ width: '16rem' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Asigned to</Typography>
                </TableCell>
                <TableCell align='left' style={{ width: '16rem' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Priority</Typography>
                </TableCell>
                <TableCell align='left' style={{ width: '8rem' }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Deadline</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow hover key={row.judul} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 300, fontSize: '0.875rem !important' }}>{row.asigned}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 300, fontSize: '0.875rem !important' }}>{row.priority}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 300, fontSize: '0.875rem !important' }}>{row.date}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {/* Edit Task */}
                      <Button type='submit' sx={{ mr: 1 }} color='info' variant='text' onClick={handleEditOpen}>
                        <PencilOutline />
                      </Button>
                      {/* Modal Edit Task */}
                      <Modal open={editOpen} onClose={handleEditClose} aria-labelledby='modal-edit-form'>
                        <Card sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4}} id='modal-edit-form'>
                          <form onSubmit={e => e.preventDefault()}>
                            <CardContent>
                              <Typography variant='h6'>Create Task</Typography>
                              <br></br>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={12} lg={6}>
                                  <TextField fullWidth label='Task Title' placeholder='Task A' />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                  <FormControl fullWidth>
                                    <InputLabel id='form-layouts-separator-select-label'>Asigned To</InputLabel>
                                    <Select
                                      label='asigned'
                                      defaultValue=''
                                      id='form-layouts-separator-asigned'
                                      labelId='form-layouts-separator-asigned-label'
                                    >
                                      <MenuItem value='abi'>abi</MenuItem>
                                      <MenuItem value='bibi'>bibi</MenuItem>
                                      <MenuItem value='cici'>cici</MenuItem>
                                      <MenuItem value='didi'>didi</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6}>
                                  <DatePickerWrapper>
                                    <DatePicker
                                      selected={date}
                                      showYearDropdown
                                      showMonthDropdown
                                      placeholderText='DD-MM-YYYY'
                                      customInput={<CustomInputStart />}
                                      id='tanggal-mulai'
                                      onChange={date => setDate(date)}
                                    />
                                  </DatePickerWrapper>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                  <FormControl fullWidth>
                                    <InputLabel id='form-layouts-separator-select-label'>Priority</InputLabel>
                                    <Select
                                      label='priority'
                                      defaultValue=''
                                      id='form-layouts-separator-priority'
                                      labelId='form-layouts-separator-priority-label'
                                    >
                                      <MenuItem value='high'>high</MenuItem>
                                      <MenuItem value='medium'>medium</MenuItem>
                                      <MenuItem value='low'>low</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={12}>
                                  <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    label='Task Description'
                                    placeholder='Description'
                                  />
                                </Grid>
                              </Grid>
                              <br></br>
                              <br></br>
                              <br></br>
                              <br></br>
                              <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                                <Button
                                  size='large'
                                  color='secondary'
                                  sx={{ mr: 2 }}
                                  variant='outlined'
                                  onClick={handleEditClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size='large'
                                  type='submit'
                                  sx={{ mr: 2 }}
                                  variant='contained'
                                  onClick={() => {
                                    setEditOpen(false)
                                    Swal.fire('', 'Task Updated Succesfully!', 'success')
                                  }}
                                >
                                  Edit Task
                                </Button>
                              </CardActions>
                            </CardContent>
                          </form>
                        </Card>
                      </Modal>
                      {/* Delete Task */}
                      <Button type='submit' sx={{ mr: 1 }} color='error' variant='text'>
                        <DeleteOutline />
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Add Task */}
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
          <Button size='medium' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleOpen}>
            Add Task
          </Button>
          {/* Modal Form*/}
          <Modal open={open} onClose={handleClose} aria-labelledby='modal-form'>
            <Card sx={style} id='modal-form'>
              <form onSubmit={e => e.preventDefault()}>
                <CardContent>
                  <Typography variant='h6'>Create Task</Typography>
                  <br></br>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} lg={6}>
                      <TextField fullWidth label='Task Title' placeholder='Task A' />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-separator-select-label'>Asigned To</InputLabel>
                        <Select
                          label='asigned'
                          defaultValue=''
                          id='form-layouts-separator-asigned'
                          labelId='form-layouts-separator-asigned-label'
                        >
                          <MenuItem value='abi'>abi</MenuItem>
                          <MenuItem value='bibi'>bibi</MenuItem>
                          <MenuItem value='cici'>cici</MenuItem>
                          <MenuItem value='didi'>didi</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                      <DatePickerWrapper>
                        <DatePicker
                          selected={date}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText='DD-MM-YYYY'
                          customInput={<CustomInputStart />}
                          id='tanggal-mulai'
                          onChange={date => setDate(date)}
                        />
                      </DatePickerWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-separator-select-label'>Priority</InputLabel>
                        <Select
                          label='priority'
                          defaultValue=''
                          id='form-layouts-separator-priority'
                          labelId='form-layouts-separator-priority-label'
                        >
                          <MenuItem value='high'>high</MenuItem>
                          <MenuItem value='medium'>medium</MenuItem>
                          <MenuItem value='low'>low</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={12}>
                      <TextField fullWidth multiline minRows={3} label='Task Description' placeholder='Description' />
                    </Grid>
                  </Grid>
                  <br></br>
                  <br></br>
                  <br></br>
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
                        Swal.fire('', 'Task Created Succesfully!', 'success')
                      }}
                    >
                      Add Task
                    </Button>
                  </CardActions>
                </CardContent>
              </form>
            </Card>
          </Modal>
        </CardActions>

        {/* Finish Make Project */}
        <br></br>
        <br></br>
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            size='large'
            type='submit'
            sx={{ mr: 2 }}
            variant='contained'
            onClick={() => {
              Swal.fire('', 'Project Created Succesfully!', 'success')
            }}
          >
            Create Project
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default CreateProjectTask
