import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import Modal from '@mui/material/Modal'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

import DatePicker from 'react-datepicker'

import { useRouter } from 'next/router'
import OutlinedInput from '@mui/material/OutlinedInput'

import Swal from 'sweetalert2'
import { useSession } from 'next-auth/react'
import axios from 'src/pages/api/axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
}

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const PeopleTable = ({ rows }) => {
  const router = useRouter()
  const session = useSession()

  const [role, setRole] = useState('')
  const [id, setId] = useState('')

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    email: '',
    name: '',
    nip: '',
    uid: ''
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleChangeRole = (e, id) => {
    axios
      .put(`user/${id}`, { role: e.target.value })
      .then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Role has been updated'
        })
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong'
        })
      })
  }

  const handleEdit = async e => {
    e.preventDefault()

    const data = {
      name: values.name,
      nip: values.nip,
      email: values.email,
      password: values.password
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .put(`user/${values.uid}`, data)
          .then(res => {
            if (res.status === 200) {
              Swal.fire({
                title: 'Edit People Success',
                text: 'Press OK to continue',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            }

            setEditOpen(false)
            router.push('/people')
          })
          .catch(err => {
            Swal.fire({
              title: 'Edit People Failed',
              text: err.message,
              confirmButtonColor: '#d33',
              confirmButtonText: 'OK'
            })
          })
      }
    })
  }

  const handleDelete = async id => {
    const data = {
      name: values.name,
      nip: values.nip,
      email: values.email,
      password: values.password,
      id: values.id
    }

    axios
      .delete(`user/${id}`, data)
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            title: 'Delete People Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

          router.push('/people')
        }
      })
      .catch(err => {
        Swal.fire({
          title: 'Delete People Failed',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      })
  }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    Swal.fire('Cancelled', 'Task is not created!', 'error')
  }
  const [date, setDate] = useState(null)

  const [editOpen, setEditOpen] = useState(false)

  // const handleEditOpen = () => setEditOpen(true)
  const handleEditOpen = user => {
    setEditOpen(true)
    setValues({
      ...values,
      name: user.name,
      nip: user.nip,
      email: user.email,
      uid: user.id
    })
  }

  const handleEditClose = () => {
    setEditOpen(false)
    setValues({
      ...values,
      name: '',
      nip: '',
      email: '',
      uid: ''
    })
  }

  useEffect(() => {
    if (session.status === 'authenticated') {
      setRole(session.data.role)
      setId(session.data.uid)
    }
  }, [session])

  return (
    <Card>
      {id == 1 && (
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
          <Link passHref href='/add-people'>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Add People
            </Button>
          </Link>
        </CardActions>
      )}
      <TableContainer>
        <Table sx={{ minWidth: 50 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell align='left' style={{ width: '16rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Name</Typography>
              </TableCell>
              <TableCell align='center' style={{ width: '2rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Number of Project</Typography>
              </TableCell>
              <TableCell align='center' style={{ width: '2rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Number of Task</Typography>
              </TableCell>
              {id == 1 && (
                <>
                  <TableCell align='center' style={{ width: '2rem' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Role</Typography>
                  </TableCell>
                  <TableCell align='center' style={{ width: '20rem' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Action</Typography>
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(user => (
              <TableRow hover key={user.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell align='left' style={{ width: '16rem' }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{user.name}</Typography>
                </TableCell>
                <TableCell align='center' style={{ width: '16rem' }}>
                  {user.UserProject.length}
                </TableCell>
                <TableCell align='center' style={{ width: '16rem' }}>
                  {user.taskToDo.length}
                </TableCell>
                {id == 1 && (
                  <>
                    <TableCell align='center'>
                      <form onSubmit={e => e.preventDefault()}>
                        <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
                          <Select
                            label='role'
                            defaultValue={user.role}
                            id='form-layouts-separator-role'
                            labelId='form-layouts-separator-role-label'
                            onChange={e => handleChangeRole(e, user.id)}
                          >
                            <MenuItem value='admin'>Admin</MenuItem>
                            <MenuItem value='employee'>Employee</MenuItem>
                          </Select>
                        </FormControl>
                      </form>
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        type='submit'
                        sx={{ mr: 1 }}
                        color='info'
                        variant='text'
                        onClick={e => handleEditOpen(user)}
                      >
                        <PencilOutline />
                      </Button>
                      <Modal open={editOpen} onClose={handleEditClose}>
                        <Card sx={style}>
                          {/* form edit people */}
                          <CardContent>
                            <Typography variant='h6'>Edit people information</Typography>
                            <br></br>
                            <Grid container spacing={2}>
                              <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
                                <Grid item xs={12} sm={12} lg={12}>
                                  <TextField
                                    autoFocus
                                    fullWidth
                                    id='name'
                                    label='Name'
                                    value={values.name}
                                    sx={{ marginBottom: 4 }}
                                    onChange={handleChange('name')}
                                  />
                                </Grid>
                                <TextField
                                  fullWidth
                                  type='email'
                                  label='Email'
                                  value={values.email}
                                  sx={{ marginBottom: 4 }}
                                  onChange={handleChange('email')}
                                />
                                <TextField
                                  fullWidth
                                  id='nip'
                                  label='NIP'
                                  value={values.nip}
                                  sx={{ marginBottom: 4 }}
                                  onChange={handleChange('nip')}
                                />
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='auth-register-password'>Password (optional)</InputLabel>
                                  <OutlinedInput
                                    label='Password (optional)'
                                    id='auth-register-password'
                                    onChange={handleChange('password')}
                                    type={values.showPassword ? 'text' : 'password'}
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        <IconButton
                                          edge='end'
                                          onClick={handleClickShowPassword}
                                          onMouseDown={handleMouseDownPassword}
                                          aria-label='toggle password visibility'
                                        >
                                          {values.showPassword ? (
                                            <EyeOutline fontSize='small' />
                                          ) : (
                                            <EyeOffOutline fontSize='small' />
                                          )}
                                        </IconButton>
                                      </InputAdornment>
                                    }
                                  />
                                </FormControl>
                                <br></br>
                                <br></br>
                                <CardActions style={{ display: 'flex', alignItems: 'end', justifyContent: 'end' }}>
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
                                    Edit People
                                  </Button>
                                </CardActions>
                              </form>
                            </Grid>
                          </CardContent>
                          {/* end form edit people */}
                        </Card>
                      </Modal>
                      <Button
                        type='submit'
                        sx={{ mr: 1 }}
                        color='error'
                        variant='text'
                        onClick={e => {
                          Swal.fire({
                            title: 'Delete Member?',
                            text: 'Click "Delete Member" for Delete member',
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Delete Member'
                          }).then(result => {
                            if (result.isConfirmed) {
                              handleDelete(user.id)
                            }
                          })
                        }}
                      >
                        <DeleteOutline />
                      </Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Divider sx={{ margin: 0 }} />
      <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
        <Link passHref href='/add-people'>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Add People
          </Button>
        </Link>
      </CardActions> */}
    </Card>
  )
}

export default PeopleTable
