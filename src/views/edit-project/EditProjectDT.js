// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

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

import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import axios from 'src/pages/api/axios'
import { useRouter } from 'next/router'

const CustomInputStart = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Start Date' autoComplete='on' />
})

const CustomInputEnd = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='End Date' autoComplete='off' />
})

const EditProject = props => {
  // ** States
  const [language, setLanguage] = useState([])
  const [startDate, setSDate] = useState(new Date(`${props.data.project.startdate}`))
  const [endDate, setEDate] = useState(new Date(`${props.data.project.enddate}`))

  const router = useRouter()

  const [participants, setParticipants] = useState(
    props.data?.user.map(user => {
      return {
        ...user,
        checked: false
      }
    })
  )

  const [values, setValues] = useState({
    p_title: props.data.project.title,
    p_description: props.data.project.description
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleEdit = e => {
    e.preventDefault()

    const data = {
      title: values.p_title,
      startdate: startDate,
      enddate: endDate,
      description: values.p_description
    }

    axios
      .put(`/project/${props.data.project.id}`, data)
      .then(res => {
        Swal.fire({
          title: 'Success!',
          text: 'Project has been updated',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        router.push(`/project-detail/${props.data.project.id}`)
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }

  const handleAddParticipant = e => {
    e.preventDefault()

    axios
      .post('project/addparticipants', {
        project: props.data.project,
        participants: participants
      })
      .then(res => {
        Swal.fire({
          title: 'Success!',
          text: 'Participants added to project',
          icon: 'success',
          confirmButtonText: 'Ok'
        })

        router.push(`/project-detail/${props.data.project.id}`)
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
  }

  useEffect(() => {}, [])

  const rows = participants.map(user => ({
    id: user.id,
    username: user.name,
    nip: user.nip,
    project: user.UserProject.length,
    task: user.taskToDo.length,
    checked: user.checked
  }))

  const columns = [
    {
      field: 'checked',
      sortable: false,
      renderHeader: () => (
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              checked={participants.filter(participant => participant.checked === true).length === participants.length}
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
      ),
      minWidth: 30,
      renderCell: params => (
        <FormControlLabel
          control={
            <Checkbox
              checked={params.value}
              onChange={e => {
                let checked = e.target.checked
                setParticipants(
                  participants.map(participant => {
                    if (participant.id === params.id) {
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
      ),
      align: 'left'
    },
    {
      field: 'nip',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          NIP
        </Typography>
      ),
      minWidth: 150,
      flex: 0.8,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      ),
      align: 'left'
    },
    {
      field: 'username',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Name</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'project',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Number of Project</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'task',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Number of Task</Typography>
      ),
      minWidth: 200,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {params.value}
        </Typography>
      )
    }
  ]

  return (
    <Card>
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Typography variant='h6'>Project Description</Typography>
          <br></br>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12} lg={11}>
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
          <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
            <Button size='large' type='submit' variant='contained' onClick={handleEdit}>
              Edit Project
            </Button>
          </CardActions>
          <Divider sx={{ margin: 0 }} />
          <br></br>

          {/* Daftar Peserta */}
          <Typography variant='h6'>Add Project Participant</Typography>
          {props.data?.user.length > 0 ? (
            <>
              <Box sx={{ width: '100%' }}>
                <DataGrid
                  initialState={{
                    sorting: {
                      sortModel: [
                        { field: 'project', sort: 'asc' },
                        { field: 'task', sort: 'asc' }
                      ]
                    }
                  }}
                  getRow
                  rows={rows}
                  columns={columns}
                  pprioritySize={5}
                  rowsPerPpriorityOptions={[5]}
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  sx={{
                    height: rows.length > 5 ? '70vh' : '45vh',
                    overflowY: 'auto',
                    width: '100%'
                  }}
                />
              </Box>
              <Divider sx={{ margin: 0 }} />
              <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleAddParticipant}>
                  Add Participant
                </Button>
              </CardActions>
            </>
          ) : (
            <Typography variant='body1' color='text.secondary' align='center'>
              No participant to add
            </Typography>
          )}
        </CardContent>
      </form>
    </Card>
  )
}

export default EditProject
