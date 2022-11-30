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
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline' // ** Icons Imports
import Alert from 'mdi-material-ui/Alert'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start Meeting Time' autoComplete='off' />
})
const CustomInput2 = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='End Meeting Time' autoComplete='off' />
})

const CreateMeeting = props => {
  // ** States
  const [startDate, setSDate] = useState(new Date())
  const [endDate, setEDate] = useState(new Date())

  const [participants, setParticipants] = useState(
    props.users.map(user => {
      return {
        ...user,
        checked: false
      }
    })
  )

  const [values, setValues] = useState({
    m_title: '',
    m_description: '',
    m_link: '',
    m_duration: '0',
  })

  // ** Hook

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleMeeting = async e => {
    e.preventDefault()

    try {
      const res = await axios.post('/meet', {
        title: values.m_title,
        startDate: startDate,
        endDate: endDate,
        duration: values.m_duration,
        link: values.m_link,
        description: values.m_description,
        participants: participants
      })

      if (res.status === 201) {
        Swal.fire({
          title: 'Create Meeting Success',
          text: 'Press OK to continue',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'Create Meeting Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  useEffect(() => {
    console.log(participants)
  }, [endDate, participants, startDate, values])


  return (
    <Card>
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Typography variant='h6'>Meeting Description</Typography>
          <br></br>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={6}>
              <TextField
                fullWidth
                label='Meeting Title'
                placeholder='Title'
                defaultValue={values.m_title}
                onChange={handleChange('m_title')}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <TextField
                fullWidth
                label='Meeting Place'
                placeholder='zoom/'
                defaultValue={values.m_link}
                onChange={handleChange('m_link')} />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={startDate}
                showYearDropdown
                showMonthDropdown
                showTimeSelect
                dateFormat="Pp"
                placeholderText='DD-MM-YYYY, HH:MM'
                customInput={<CustomInput />}
                id='form-layouts-separator-meet'
                onChange={startDate => setSDate(startDate)}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={endDate}
                showYearDropdown
                showMonthDropdown
                showTimeSelect
                dateFormat="Pp"
                placeholderText='DD-MM-YYYY, HH:MM'
                customInput={<CustomInput2 />}
                id='form-layouts-separator-meet'
                onChange={endDate => setEDate(endDate)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Meeting Duration</InputLabel>
                <Select
                  label='Durasi Rapat'
                  value={values.m_duration}
                  onChange={handleChange('m_duration')}
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='60'>1 Hour</MenuItem>
                  <MenuItem value='90'>1 Our and Half</MenuItem>
                  <MenuItem value='120'>2 Hour</MenuItem>
                  <MenuItem value='150'>2 Hour and Half</MenuItem>
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} sm={12} lg={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Meeting Description'
                placeholder='Description'
                defaultValue={values.m_description}
                onChange={handleChange('m_description')} />
            </Grid>
          </Grid>
          <br></br>

          {/* Daftar Peserta */}
          <Typography variant='h6'>Meeting Participant</Typography>
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
                      label='All' />
                  </TableCell>
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='left'>NIP</TableCell>
                  <TableCell align='left'>Number Of Meeting</TableCell>
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
                    <TableCell align='center'>{user.meet}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <Divider sx={{ margin: 0 }} />
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            size='large'
            type='submit'
            sx={{ mr: 2 }}
            variant='contained'
            onClick={handleMeeting}
          >
            Create Meeting
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default CreateMeeting
