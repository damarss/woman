// ** React Imports
import { forwardRef, useState } from 'react'

// ** Import mui material
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

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import Swal from 'sweetalert2'

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

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Deadline' autoComplete='on' />
})

const rows = [
  {
    name: 'Abidin'
  },
  {
    name: 'Soleh'
  },
  {
    name: 'Umi'
  },
  {
    name: 'Lutpil'
  },
  {
    name: 'Mukidi'
  }
]

const UpdateTask = (props) => {
  const [date, setDate] = useState(null)

  const [Open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button size='medium' type='submit' variant='contained' color='primary' onClick={handleOpen}>
        Update
      </Button>
      <Modal open={Open} onClose={handleClose}>
        <Card sx={style}>
          {/* form edit task */}
          <form onSubmit={props.action}>
            <CardContent>
              <Typography variant='h6'>Update Task</Typography>
              <br></br>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={12} lg={6}>
                  <TextField fullWidth label='Task Title' placeholder='Task A' />
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-asigned-label-edit'>Asigned To</InputLabel>
                    <Select
                      label='asigned to'
                      defaultValue=''
                      id='form-layouts-separator-asigned'
                      labelId='form-layouts-separator-asigned-label-edit'
                    >
                      {rows.map(row => (
                        <MenuItem key={row.name} value={row.name}>
                          {row.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                  <DatePickerWrapper>
                    <DatePicker
                      selected={date}
                      showYearDropdown
                      showMonthDropdown
                      showTimeSelect
                      placeholderText='DD-MM-YYYY, HH:MM'
                      dateFormat='Pp'
                      customInput={<CustomInput />}
                      id='tanggal-selesai'
                      onChange={date => setDate(date)}
                    />
                  </DatePickerWrapper>
                </Grid>
                <Grid item xs={12} sm={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-priority-label-edit'>Priority</InputLabel>
                    <Select
                      label='priority'
                      defaultValue=''
                      id='form-layouts-separator-priority'
                      labelId='form-layouts-separator-priority-label-edit'
                    >
                      <MenuItem value='High'>High</MenuItem>
                      <MenuItem value='Medium'>Medium</MenuItem>
                      <MenuItem value='Low'>Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} lg={12}>
                  <TextField fullWidth multiline minRows={5} label='Task Description' placeholder='Description' />
                </Grid>
              </Grid>
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
                    Swal.fire('', 'Task Updated Succesfully!', 'success')
                  }}
                >
                  Update Task
                </Button>
              </CardActions>
            </CardContent>
          </form>
          {/* end form edit task */}
        </Card>
      </Modal>
    </>
  )
}

export default UpdateTask
