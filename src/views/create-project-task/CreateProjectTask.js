// ** React Imports
import { forwardRef, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ** Next Imports
// import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'src/pages/api/axios'

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

import UpdateTask from 'src/views/task/UpdateTask'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

import Swal from 'sweetalert2'

const priorities = ['Low', 'Medium', 'High']

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

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Deadline' autoComplete='on' />
})

const CreateProjectTask = props => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setValues({
      t_title: '',
      t_description: '',
      t_user: '',
      t_priority: '0'
    });
    setDate(new Date);
    setOpen(false)
    Swal.fire('Cancelled', 'Task is not created!', 'error')
  }
  const [date, setDate] = useState(new Date)
  const [uid, setUid] = useState(null)

  const [editOpen, setEditOpen] = useState(false)
  const handleEditOpen = async (data, e) => {
    setValues({
      t_title: data.title,
      t_description: data.description,
      t_user: data.userId,
      t_priority: data.priority
    });
    setUid(data.id)
    setDate(new Date(data.duedate));
    setEditOpen(true);
    console.log(data.id)
  }
  const handleEditClose = () => {
    setValues({
      t_title: '',
      t_description: '',
      t_user: '',
      t_priority: '0'
    });
    setDate(new Date)
    setUid(null)
    setEditOpen(false)
    Swal.fire('Cancelled', 'Task is not updated!', 'error')
  }

  // ** States
  const [endDate, setEDate] = useState(new Date())
  const [projectId, setProjectId] = useState('')

  const [values, setValues] = useState({
    t_title: '',
    t_description: '',
    t_user: '',
    t_priority: '0'
  })

  // ** Hook

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    console.log(event.target.value)
  }

  const handleTask = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/task', {
        title: values.t_title,
        duedate: endDate,
        priority: values.t_priority,
        description: values.t_description,
        status: '0',
        projectId: projectId,
        userId: values.t_user
      })

      if (res.status === 201) {
        setOpen(false)
        Swal.fire({
          title: 'Create Task Success',
          text: 'Press OK to continue',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Task Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleEdit = async e => {
    e.preventDefault()

    axios
      .put(`task/${uid}`, {
        title: values.t_title,
        duedate: endDate,
        priority: values.t_priority,
        description: values.t_description,
        userId: values.t_user
      })
      .then(async res => {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Task Updated'
        })
        setEditOpen(false)
        router.reload()
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong'
        })
      })

    // try {
    //   const res = await axios.put(`task/${id}`, {
    //     title: values.t_title,
    //     duedate: endDate,
    //     priority: values.t_priority,
    //     description: values.t_description,
    //     userId: values.t_user
    //   })

    //   if (res.status === 201) {
    //     setEditOpen(false)
    //     Swal.fire({
    //       title: 'Update Task Success',
    //       text: 'Press OK to continue',
    //       icon: 'success',
    //       confirmButtonColor: '#68B92E',
    //       confirmButtonText: 'OK'
    //     })
    //   }
    // } catch (error) {
    //   Swal.fire({
    //     title: 'Update Task Failed',
    //     text: error,
    //     icon: 'error',
    //     confirmButtonColor: '#d33',
    //     confirmButtonText: 'OK'
    //   })
    // }
  }

  useEffect(() => {
    setProjectId(props.data.id)
  }, [endDate, values])

  const handleDelete = async id => {
    console.log(id)
    axios
      .delete(`task/${id}`)
      .then(async res => {
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Task Deleted'
        })
        router.reload()
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong'
        })
      })
    // axios
    //   .delete(`task/${id}`, data)
    //   .then(res => {
    //     if (res.status === 200) {
    //       Swal.fire({
    //         title: 'Delete Task Success',
    //         text: 'Press OK to continue',
    //         icon: 'success',
    //         confirmButtonText: 'Ok'
    //       })

    //       router.push('/people')
    //     }
    //   })
    //   .catch(err => {
    //     Swal.fire({
    //       title: 'Delete Task Failed',
    //       text: err.message,
    //       icon: 'error',
    //       confirmButtonColor: '#d33',
    //       confirmButtonText: 'OK'
    //     })
    //   })
  }

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
              {props.data.Task.map(row => (
                <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 300, fontSize: '0.875rem !important' }}>{row.user.name}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 300, fontSize: '0.875rem !important' }}>
                        {priorities[row.priority]}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell align='left'>
                    <Link href='#'>
                      <Typography sx={{ fontWeight: 300, fontSize: '0.875rem !important' }}>{new Date(row.duedate).toLocaleDateString('id-ID')}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {/* Edit Task */}
                      <Button type='submit' sx={{ mr: 1 }} color='info' variant='text' onClick={e => handleEditOpen(row)}>
                        <PencilOutline />
                      </Button>
                      {/* Modal Edit Task */}
                      <Modal open={editOpen} onClose={handleEditClose} aria-labelledby='modal-form'>
                        <Card sx={style} id='modal-form'>
                          {/* form edit task */}
                          <form onSubmit={e => e.preventDefault()}>
                            <CardContent>
                              <Typography variant='h6'>Update Task</Typography>
                              <br></br>
                              <Grid container spacing={5}>
                                <Grid item xs={12} sm={12} lg={6}>
                                  <TextField
                                    fullWidth
                                    label='Task Title'
                                    placeholder='Title'
                                    value={values.t_title}
                                    onChange={handleChange('t_title')}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                  <FormControl fullWidth>
                                    <InputLabel id='form-layouts-separator-asigned-label-edit'>Asigned To</InputLabel>
                                    <Select
                                      label='asigned to '
                                      id='form-layouts-separator-asigned'
                                      labelId='form-layouts-separator-asigned-label'
                                      value={values.t_user}
                                      onChange={handleChange('t_user')}
                                    >
                                      {props.data.UserProject.map(row => (
                                        <MenuItem key={row.userId} value={row.userId}>
                                          {row.user.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12} lg={6}>
                                  <DatePickerWrapper>
                                    <DatePicker
                                      selected={endDate}
                                      showYearDropdown
                                      showMonthDropdown
                                      showTimeSelect
                                      dateFormat='Pp'
                                      placeholderText='DD-MM-YYYY, HH:MM'
                                      customInput={<CustomInputStart />}
                                      id='tanggal-selesai'
                                      onChange={endDate => setEDate(endDate)}
                                    />
                                  </DatePickerWrapper>
                                </Grid>
                                <Grid item xs={12} sm={6} lg={6}>
                                  <FormControl fullWidth>
                                    <InputLabel id='form-layouts-separator-select-label'>Priority</InputLabel>
                                    <Select
                                      label='priority'
                                      id='form-layouts-separator-priority'
                                      labelId='form-layouts-separator-priority-label'
                                      placeholder='Title'
                                      value={values.t_priority}
                                      onChange={handleChange('t_priority')}
                                    >
                                      <MenuItem value='2'>High</MenuItem>
                                      <MenuItem value='1'>Medium</MenuItem>
                                      <MenuItem value='0'>Low</MenuItem>
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
                                    value={values.t_description}
                                    onChange={handleChange('t_description')}
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
                                  onClick={handleEditClose}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  size='large'
                                  type='submit'
                                  sx={{ mr: 2 }}
                                  variant='contained'
                                  onClick={handleEdit}
                                >
                                  Update Task
                                </Button>
                              </CardActions>
                            </CardContent>
                          </form>
                          {/* end form edit task */}
                        </Card>
                      </Modal>
                      {/* Delete Task */}
                      <Button
                        type='submit'
                        sx={{ mr: 1 }}
                        color='error'
                        variant='text'
                        onClick={() => {
                          Swal.fire({
                            title: 'Hapus Tugas?',
                            text: 'Tekan tombol "Hapus Tugas" untuk menghapus tugas',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ya, Hapus Tugas'
                          }).then(result => {
                            if (result.isConfirmed) {
                              handleDelete(row.id)
                            }
                          })
                        }}
                      >
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
          {/* Modal Add Task Form*/}
          <Modal open={open} onClose={handleClose} aria-labelledby='modal-form'>
            <Card sx={style} id='modal-form'>
              <form onSubmit={e => e.preventDefault()}>
                <CardContent>
                  <Typography variant='h6'>Create Task</Typography>
                  <br></br>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} lg={6}>
                      <TextField
                        fullWidth
                        label='Task Title'
                        placeholder='Title'
                        value={values.t_title}
                        onChange={handleChange('t_title')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-separator-select-label'>Asigned To</InputLabel>
                        <Select
                          label='asigned to '
                          id='form-layouts-separator-asigned'
                          labelId='form-layouts-separator-asigned-label'
                          value={values.t_user}
                          onChange={handleChange('t_user')}
                        >
                          {props.data.UserProject.map(row => (
                            <MenuItem key={row.userId} value={row.userId}>
                              {row.user.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} lg={6}>
                      <DatePickerWrapper>
                        <DatePicker
                          selected={endDate}
                          showYearDropdown
                          showMonthDropdown
                          showTimeSelect
                          dateFormat='Pp'
                          placeholderText='DD-MM-YYYY, HH:MM'
                          customInput={<CustomInputStart />}
                          id='tanggal-selesai'
                          onChange={endDate => setEDate(endDate)}
                        />
                      </DatePickerWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                      <FormControl fullWidth>
                        <InputLabel id='form-layouts-separator-select-label'>Priority</InputLabel>
                        <Select
                          label='priority'
                          id='form-layouts-separator-priority'
                          labelId='form-layouts-separator-priority-label'
                          placeholder='Title'
                          value={values.t_priority}
                          onChange={handleChange('t_priority')}
                        >
                          <MenuItem value='2'>High</MenuItem>
                          <MenuItem value='1'>Medium</MenuItem>
                          <MenuItem value='0'>Low</MenuItem>
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
                        value={values.t_description}
                        onChange={handleChange('t_description')}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                    <Button size='large' color='secondary' sx={{ mr: 2 }} variant='outlined' onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleTask}>
                      Add Task
                    </Button>
                  </CardActions>
                </CardContent>
              </form>
              {/* End Form */}
            </Card>
          </Modal>
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default CreateProjectTask
