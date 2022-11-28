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
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

const datas = [
  {
    name: 'Sally Quinn1',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  },
  {
    name: 'Sally Quinn2',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  },
  {
    name: 'Sally Quinn3',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  },
  {
    name: 'Sally Quinn4',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  },
  {
    name: 'Sally Quinn5',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  },
  {
    name: 'Sally Quinn6',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  },
  {
    name: 'Sally Quinn7',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  },
  {
    name: 'Sally Quinn8',
    nip: '220129129012',
    projek: 4,
    tugas: 7
  }
]

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='on' />
})

const CustomInputEnd = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='End Date' autoComplete='off' />
})

const CreateProject = props => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)
  const [tanggal, setDateTwo] = useState(null)

  return (
    <Card>
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Typography variant='h6'>Project Description</Typography>
          <br></br>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={8}>
              <TextField fullWidth label='Project Title' placeholder='Proyek A' />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='DD-MM-YYYY'
                customInput={<CustomInputStart />}
                id='tanggal-mulai'
                onChange={date => setDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <DatePicker
                selected={tanggal}
                showYearDropdown
                showMonthDropdown
                placeholderText='DD-MM-YYYY'
                customInput={<CustomInputEnd />}
                id='tanggal-berakhir'
                onChange={tanggal => setDateTwo(tanggal)}
              />
            </Grid>
            <Grid item xs={12} sm={12} lg={12}>
              <TextField fullWidth multiline minRows={3} label='Project Description' placeholder='Bio...' />
            </Grid>
          </Grid>
          <br></br>
          {/* Daftar Peserta */}
          <Typography variant='h6'>Project Participant</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>
                    <FormControlLabel control={<Checkbox defaultChecked />} label='All' />
                  </TableCell>
                  <TableCell align='center'>NIP</TableCell>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Number of Projek</TableCell>
                  <TableCell align='center'>Number of Task</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.users.map(data => (
                  <TableRow
                    key={data.name}
                    sx={{
                      '&:last-of-type td, &:last-of-type th': {
                        border: 0
                      }
                    }}
                  >
                    <TableCell align='left'>
                      <FormControlLabel control={<Checkbox />} label='' />
                    </TableCell>
                    <TableCell align='center'>{data.nip}</TableCell>
                    <TableCell component='th' scope='row' align='center'>
                      {data.name}
                    </TableCell>
                    <TableCell align='center'>{data.projek}</TableCell>
                    <TableCell component='th' scope='row' align='center'>
                      {data.tugas}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>

        <Divider sx={{ margin: 0 }} />
        <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
          <Button  size='large'
            type='submit'
            sx={{ mr: 2 }}
            variant='contained' 
            href='/create-project-task'>
            Next
          </Button>
        </CardActions>
      </form>
    </Card>
  ) 
}

export default CreateProject 
