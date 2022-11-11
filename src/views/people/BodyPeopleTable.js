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

const rows = [
  {
    name: 'Sally Quinn',
    role: 'Manager',
    proyek: 2,
    tugas: 7,
    designation: 'Humas Utama'
  },
  {
    role: 'Admin',
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
    role: 'user'
  },
  {
    role: 'super admin',
    proyek: 6,
    name: 'Ralph Leonard',
    tugas: 7,
    designation: 'Pencacah Utama'
  },
  {
    role: 'user',
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
    role: 'user',
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

const BodyTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 50 }} aria-label='table in dashboard'>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell align='left' style={{width:'16rem'}}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                </TableCell>
                <TableCell align='center' style={{width:'16rem'}}>{row.tugas}</TableCell>
                <TableCell align='center' style={{width:'16rem'}}>{row.proyek}</TableCell>
                <TableCell align='center'>
                  {row.role}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default BodyTable
