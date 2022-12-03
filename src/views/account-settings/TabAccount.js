// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = props => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  const [user, setUser] = useState({
    name: '',
    email: '',
    nip: '',
    role: ''
  })

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  const handleChange = prop => event => {
    setUser({ ...user, [prop]: event.target.value })
  }

  const getUser = async () => {
    await axios
      .get('/user/detail')
      .then(res => {
        if (res.status === 200) {
          setUser(res.data)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleEdit = async e => {
    e.preventDefault()

    const data = {
      name: user.name,
      nip: user.nip,
      email: user.email
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
          .put(`user/${user.id}`, data)
          .then(res => {
            if (res.status === 200) {
              Swal.fire({
                title: 'Edit People Success',
                text: 'Press OK to continue',
                icon: 'success',
                confirmButtonText: 'Ok'
              })
            }
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

  useEffect(() => {
    getUser()
  }, [])

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <Typography variant='h3' sx={{ fontWeight: 'bold' }} gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='NIP'
              placeholder='1234567890'
              defaultValue=''
              value={user.nip}
              onChange={handleChange('nip')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Name'
              placeholder='John Doe'
              defaultValue={user.name}
              value={user.name}
              onChange={handleChange('name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='email'
              label='Email'
              placeholder='johnDoe@example.com'
              defaultValue={user.email}
              value={user.email}
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select label='Role' defaultValue={user.role} value={user.role} onChange={handleChange('role')} disabled>
                <MenuItem value='admin'>Admin</MenuItem>
                <MenuItem value='employee'>Employee</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }} onClick={handleEdit}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={e => getUser()}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
