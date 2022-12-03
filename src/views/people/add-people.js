// ** MUI Imports
import { useEffect, useState, Fragment } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import themeConfig from 'src/configs/themeConfig'
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
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'

import { useRouter } from 'next/router'
import OutlinedInput from '@mui/material/OutlinedInput'

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const PeopleTable = ({ rows }) => {
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
    email: '',
    name: '',
    nip: ''
  })

  // ** Hook
  const theme = useTheme()
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleRegister = async e => {
    e.preventDefault()

    const data = {
      name: values.name,
      nip: values.nip,
      email: values.email,
      password: values.password
    }

    axios
      .post('auth/register', data)
      .then(res => {
        if (res.status === 200) {
          Swal.fire({
            title: 'Add People Success',
            text: 'Press OK to continue',
            icon: 'success',
            confirmButtonText: 'Ok'
          })

          router.push('/people')
        }
      })
      .catch(err => {
        Swal.fire({
          title: 'Add People Failed',
          text: err.message,
          icon: 'error',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography>Add People</Typography>
          </Box>

          <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
              autoFocus
              fullWidth
              id='name'
              label='Name'
              sx={{ marginBottom: 4 }}
              onChange={handleChange('name')}
            />
            <TextField fullWidth type='email' label='Email' sx={{ marginBottom: 4 }} onChange={handleChange('email')} />
            <TextField fullWidth id='nip' label='NIP' sx={{ marginBottom: 4 }} onChange={handleChange('nip')} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
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
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Button
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              sx={{ marginTop: 5 }}
              onClick={handleRegister}
            >
              Add People
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default PeopleTable
