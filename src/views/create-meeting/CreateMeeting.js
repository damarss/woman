// ** React Imports
import { forwardRef, useState } from 'react'

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

const datas = [
  {
    name: 'Sally Quinn',
    nip: '9'
  },
  {
    name: 'Sally Quinn1',
    nip: '1'
  },
  {
    name: 'Sally Quinn2',
    nip: '2'
  },
  {
    name: 'Sally Quinn3',
    nip: '3'
  },
  {
    name: 'Sally Quinn4',
    nip: '4'
  },
  {
    name: 'Sally Quinn5',
    nip: '5'
  },
  {
    name: 'Sally Quinn6',
    nip: '6'
  },
  {
    name: 'Sally Quinn7',
    nip: '7'
  }
]

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Meeting Time' autoComplete='off' />
})

const CreateMeeting = () => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [Time, setTime] = useState(null)

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  // ** Handle Check
  const [checked, setChecked] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  // Add/Remove checked item from list
  const handleCheck = async (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    console.log(updatedList);
  };
  // Add/Remove checked All item from list
  const handleSelectAll = async e => {
    setIsCheckAll(!isCheckAll);
    setChecked(datas.map(li => li.nip));
    if (isCheckAll) {
      setChecked([]);
    }
  };


  return (
    <Card>
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Typography variant='h6'>Meeting Description</Typography>
          <br></br>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={6}>
              <TextField fullWidth label='Meeting Title' placeholder='Rapat IT' />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                showTimeSelect
                dateFormat="Pp"
                placeholderText='DD-MM-YYYY, HH:MM'
                customInput={<CustomInput />}
                id='form-layouts-separator-meet'
                onChange={date => setDate(date)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={Time}
                showTimeSelect
                placeholderText='hh:mm:ss'
                customInput={<CustomInput />}
                id='form-layouts-separator-meet'
                onChange={Time => setTime(Time)}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} lg={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Meeting Duration</InputLabel>
                <Select
                  label='Durasi Rapat'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='1'>1 Hour</MenuItem>
                  <MenuItem value='1.5'>1 Our and Half</MenuItem>
                  <MenuItem value='2'>2 Hour</MenuItem>
                  <MenuItem value='2.5'>2 Hour and Half</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <TextField fullWidth label='Meeting Place' placeholder='zoom/' />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <TextField fullWidth multiline minRows={3} label='Meeting Description' placeholder='Bio...' />
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
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={isCheckAll}
                        />
                      }
                      label='All' />
                  </TableCell>
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='left'>NIP</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map(data => (
                  <TableRow
                    key={data.nip}
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
                            value={data.nip}
                            type="checkbox"
                            onChange={handleCheck}
                            checked={checked.includes(data.nip)}
                          />
                        }
                        label='' />
                    </TableCell>
                    <TableCell component='th' scope='row' align='left'>
                      {data.name}
                    </TableCell>
                    <TableCell align='left'>{data.nip}</TableCell>
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
            onClick={() => {
              Swal.fire({
                title: 'Create this Meeting?',
                text: 'Make sure all the data is valid. Click "Create Meeting" to send notification to all meeting participants',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#68B92E',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Create Meeting'
              }).then(result => {
                if (result.isConfirmed) {
                  Swal.fire('', 'Meeting Created Succesfully. Click "OK" to continue.', 'success')
                }
              })
            }}
          >
            Create Meeting
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default CreateMeeting
