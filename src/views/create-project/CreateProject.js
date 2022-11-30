// ** React Imports
import { forwardRef, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ** Next Imports
// import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'src/pages/api/axios'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='on' />
})

const CustomInputEnd = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='End Date' autoComplete='off' />
})

const CreateProject = props => {
  // ** States
  const [language, setLanguage] = useState([])
  const [startDate, setSDate] = useState(new Date())
  const [endDate, setEDate] = useState(null)

  const [participants, setParticipants] = useState(
    props.users.map(user => {
      return {
        ...user,
        checked: false
      }
    })
  )

  const [values, setValues] = useState({
    p_title: '',
    p_description: '',
    p_leader: ''
  })

  // ** Hook
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleProject = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/project', {
        title: values.p_title,
        startdate: startDate,
        enddate: endDate,
        description: values.p_description,
        projectLeaderId: values.p_leader,
        participants: participants
      })

      if (res.status === 201) {
        Swal.fire({
          title: 'Create Project Success',
          text: 'Press OK to continue',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        })

        setValues({
          p_title: '',
          p_description: '',
          p_leader: ''
        })

        setSDate(new Date())
        setEDate(null)
        setParticipants(
          props.users.map(user => {
            return {
              ...user,
              checked: false
            }
          })
        )
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Project Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  useEffect(() => {}, [endDate, participants, startDate, values])

  return (
    <Card>
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Typography variant='h6'>Project Description</Typography>
          <br />
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={8}>
              <TextField
                fullWidth
                label='Project Title'
                placeholder='Proyek A'
                defaultValue={values.p_title}
                onChange={handleChange('p_title')}
                value={values.p_title}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={startDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='DD-MM-YYYY'
                customInput={<CustomInputStart />}
                id='tanggal-mulai'
                onChange={date => setSDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={endDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='DD-MM-YYYY'
                customInput={<CustomInputEnd />}
                id='tanggal-berakhir'
                onChange={date => setEDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Project Description'
                defaultValue={values.p_description}
                onChange={handleChange('p_description')}
                placeholder='Description...'
                value={values.p_description}
              />
            </Grid>
          </Grid>
          <br></br>
          {/* Daftar Peserta */}
          <Typography variant='h6'>Project Leader</Typography>
          <br />
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Project Leader</InputLabel>
              <Select
                label='Project Leader'
                value={values.p_leader}
                onChange={handleChange('p_leader')}
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
              >
                {props.users.map(user => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <br></br>
          <Typography variant='h6'>Project Participant</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          checked={
                            participants.filter(participant => participant.checked === true).length ===
                            participants.length
                          }
                          onChange={e => {
                            let checked = e.target.checked
                            setParticipants(
                              participants.map(participant => {
                                return {
                                  ...participant,
                                  checked: checked
                                }
                              })
                            )
                          }}
                        />
                      }
                      label='All'
                    />
                  </TableCell>
                  <TableCell align='center'>NIP</TableCell>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Number of Project</TableCell>
                  <TableCell align='center'>Number of Task</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participants.map(user => (
                  <TableRow
                    key={user.name}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >
                    <TableCell align='left'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={user.checked}
                            onChange={e => {
                              let checked = e.target.checked
                              setParticipants(
                                participants.map(participant => {
                                  if (participant.id === user.id) {
                                    participant.checked = checked
                                  }

                                  return participant
                                })
                              )
                            }}
                          />
                        }
                        label=''
                      />
                    </TableCell>
                    <TableCell align='center'>{user.nip}</TableCell>
                    <TableCell component='th' scope='row' align='center'>
                      {user.name}
                    </TableCell>
                    <TableCell align='center'>{user.project}</TableCell>
                    <TableCell component='th' scope='row' align='center'>
                      {user.task}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <Divider sx={{ margin: 0 }} />
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleProject}>
            Create
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default CreateProject
