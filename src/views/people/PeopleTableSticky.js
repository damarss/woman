// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'proyek',
    label: 'Number of Project',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'tugas',
    label: 'Number of Task',
    minWidth: 170,
    align: 'center',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 170,
    align: 'center',
    format: value => value.toFixed(2)
  }
]

const rows = [
  {
    name: 'Sally Quinn',
    role: 'admin',
    proyek: 2,
    tugas: 7
  },
  {
    role: 'leader',
    proyek: 4,
    name: 'Margaret Bowers',
    tugas: 7
  },
  {
    tugas: 9,
    proyek: 4,
    name: 'Minnie Roy',
    role: 'anggota'
  },
  {
    role: 'leader',
    proyek: 6,
    name: 'Ralph Leonard',
    tugas: 7
  },
  {
    name: 'Sally Quinn',
    role: 'admin',
    proyek: 2,
    tugas: 7
  },
  {
    role: 'leader',
    proyek: 4,
    name: 'Margaret Bowers',
    tugas: 7
  },
  {
    tugas: 9,
    proyek: 4,
    name: 'Minnie Roy',
    role: 'anggota'
  },
  {
    role: 'leader',
    proyek: 6,
    name: 'Ralph Leonard',
    tugas: 7
  },
  {
    name: 'Sally Quinn',
    role: 'admin',
    proyek: 2,
    tugas: 7
  },
  {
    role: 'leader',
    proyek: 4,
    name: 'Margaret Bowers',
    tugas: 7
  },
  {
    tugas: 9,
    proyek: 4,
    name: 'Minnie Roy',
    role: 'anggota'
  },
  {
    role: 'leader',
    proyek: 6,
    name: 'Ralph Leonard',
    tugas: 7
  },
  {
    role: 'anggota',
    proyek: 5,
    name: 'Annie Martin',
    tugas: 4
  },
  {
    name: 'Adeline Day',
    role: 'manager',
    proyek: 4,
    tugas: 6
  },
  {
    name: 'Lora Jackson',
    proyek: 5,
    role: 'manager',
    tugas: 8
  },
  {
    name: 'Rodney Sharp',
    role: 'anggota',
    proyek: 4,
    tugas: 5
  }
]

const PeopleTableSticky = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    if(column.id != 'role'){
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    }
                    else{
                      return (
                      <TableCell key={column.id} align={column.align}>
                        <form onSubmit={e => e.preventDefault()}>
                          <FormControl fullWidth>
                            <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
                            <Select
                              label='role'
                              defaultValue={value}
                              id='form-layouts-separator-role'
                              labelId='form-layouts-separator-role-label'
                            >
                              <MenuItem value='admin'>admin</MenuItem>
                              <MenuItem value='leader'>leader</MenuItem>
                              <MenuItem value='manager'>manager</MenuItem>
                              <MenuItem value='anggota'>anggota</MenuItem>
                            </Select>
                          </FormControl>
                        </form>
                      </TableCell>
                      )
                    }
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default PeopleTableSticky
