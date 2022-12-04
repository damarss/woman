// ** React Imports
import { forwardRef, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// ** Next Imports
// import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'src/pages/api/axios'
import { getSession } from 'next-auth/react'

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
  const [startDate, setSDate] = useState(new Date(props.data.meet.startDate))
  const [endDate, setEDate] = useState(new Date(props.data.meet.endDate))

  // const [participants, setParticipants] = useState(
  //   props.data.user.map(user => {
  //     return {
  //       ...user,
  //       checked: false
  //     }
  //   })
  // )

  const [values, setValues] = useState({
    m_title: props.data.meet.title,
    m_description: props.data.meet.description,
    m_link: props.data.meet.link,
    m_duration: props.data.meet.duration,
  })

  // ** Hook
  const router = useRouter()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleMeeting = async e => {
    e.preventDefault()

    try {
      const res = await axios.put(`/meet/${props.data.meet.id}`, {
        title: values.m_title,
        startDate: startDate,
        endDate: endDate,
        duration: Math.round(new Date(new Date(endDate) - new Date(startDate)).getTime() / 1000 / 60, 0),
        link: values.m_link,
        description: values.m_description,
      })

      if (res.status === 200) {
        Swal.fire({
          title: 'Update Meeting Success',
          text: 'Press OK to continue',
          icon: 'success',
          confirmButtonColor: '#68B92E',
          confirmButtonText: 'OK'
        })

        setValues({
          m_title: '',
          m_description: '',
          m_link: '',
          m_duration: '0',
        })
        router.push(`/meeting-admin-detail/${props.data.meet.id}`)
      }
    } catch (error) {
      Swal.fire({
        title: 'Update Meeting Failed',
        text: error,
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK'
      })
    }
  }

  // useEffect(() => {
  // }, [endDate, startDate, values])


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
                value={values.m_title}
                onChange={handleChange('m_title')}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <TextField
                fullWidth
                label='Meeting Place'
                placeholder='zoom/'
                value={values.m_link}
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
            <Grid item xs={12} sm={12} lg={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label='Meeting Description'
                placeholder='Description'
                value={values.m_description}
                onChange={handleChange('m_description')} />
            </Grid>
          </Grid>
          <br></br>

          {/* Daftar Peserta */}
          {/* <Typography variant='h6'>Meeting Participant</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    <FormControlLabel
                      control={

                        <Checkbox

                          // defaultChecked
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
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>NIP</TableCell>
                  <TableCell align='center'>Number Of Meeting</TableCell>
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
          </TableContainer>*/}
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
            Edit Meeting
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default CreateMeeting
