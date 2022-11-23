// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
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
import MenuItem from '@mui/material/MenuItem'

const rows = [
  {
    name: 'Sally Quinn',
    role: 'admin',
    proyek: 2,
    tugas: 7,
    designation: 'Humas Utama'
  },
  {
    role: 'leader',
    proyek: 4,
    name: 'Margaret Bowers',
    tugas: 7,
    designation: 'Manajer Proyek'
  },
  {
    tugas: 9,
    designation: 'Divisi Umum',
    proyek: 4,
    name: 'Minnie Roy',
    role: 'anggota'
  },
  {
    role: 'leader',
    proyek: 6,
    name: 'Ralph Leonard',
    tugas: 7,
    designation: 'Pencacah Utama'
  },
  {
    role: 'anggota',
    proyek: 5,
    name: 'Annie Martin',
    designation: 'Divisi TI',
    tugas: 4
  },
  {
    name: 'Adeline Day',
    role: 'manager',
    proyek: 4,
    tugas: 6,
    designation: 'Divisi IT'
  },
  {
    name: 'Lora Jackson',
    proyek: 5,
    role: 'manager',
    designation: 'Divisi Logistik',
    tugas: 8
  },
  {
    name: 'Rodney Sharp',
    role: 'anggota',
    proyek: 4,
    designation: 'Divisi Umum',
    tugas: 5
  }
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const PeopleTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 50 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell align='left' style={{ width: '16rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Name</Typography>
              </TableCell>
              <TableCell align='center' style={{ width: '16rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Number of Project</Typography>
              </TableCell>
              <TableCell align='center' style={{ width: '16rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Number of Task</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Role</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell align='left' style={{ width: '16rem' }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                </TableCell>
                <TableCell align='center' style={{ width: '16rem' }}>
                  {row.proyek}
                </TableCell>
                <TableCell align='center' style={{ width: '16rem' }}>
                  {row.tugas}
                </TableCell>
                <TableCell align='center'>
                  <form onSubmit={e => e.preventDefault()}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
                      <Select
                        label='role'
                        defaultValue={row.role}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default PeopleTable
