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
import Link from '@mui/material/Link'

const rows = [
  
  {
    status: 'Done',
    priority: 'Low',
    penanggungjawab: 'Margaret Bowers',
    Tugas: 'Nama Tugas',
    designation: 'Manajer priority'
  },
  {
    Tugas: 'Nama Tugas',
    designation: 'Divisi Umum',
    priority: 'Medium',
    penanggungjawab: 'Minnie Roy',
    status: 'Assign'
  },
  {
    status: 'Revision',
    priority: 'High',
    penanggungjawab: 'Ralph Leonard',
    Tugas: 'Nama Tugas',
    designation: 'Pencacah Utama'
  },
  {
    status: 'Done',
    priority: 'Medium',
    penanggungjawab: 'Annie Martin',
    designation: 'Divisi TI',
    Tugas: 'Nama Tugas'
  },
  {
    penanggungjawab: 'Adeline Day',
    status: 'TurnedIn',
    priority: 'High',
    Tugas: 'Nama Tugas',
    designation: 'Divisi IT'
  },
  {
    penanggungjawab: 'Lora Jackson',
    priority: 'Low',
    status: 'OnProgress',
    designation: 'Divisi Logistik',
    Tugas: 'Nama Tugas'
  },
  {
    penanggungjawab: 'Rodney Sharp',
    status: 'Done',
    priority: 'Medium',
    designation: 'Divisi Umum',
    Tugas: 'Nama Tugas'
  }
]

const statusObj = {
  Revision: { color: 'info' },
  Assign: { color: 'error' },
  OnProgress: { color: 'primary' },
  TurnedIn: { color: 'warning' },
  Done: { color: 'success' }
}

const columns = [
  { id: 'Tugas', label: 'Tugas', minWidth: 150 },
  {
    id: 'penanggungjawab',
    label: 'Penanggung Jawab',
    minWidth: 150,
    align: 'left',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'priority',
    label: 'priority',
    minWidth: 70,
    align: 'left',
    format: value => value.toLocaleString('en-US')
  },
  {
    id: 'Status',
    label: 'Status',
    minWidth: 70,
    align: 'center',
    format: value => value.toFixed(2)
  }
]

const PeopleTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 10 }} aria-label='table in dashboard'>
        <Link href='/projectdetail'>
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
            {rows.map(row => (
              <TableRow hover key={row.penanggungjawab} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell style={{width:'16rem'}}>
                <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.Tugas}</Typography>
                </TableCell>
                <TableCell style={{width:'16rem'}}>{row.penanggungjawab}</TableCell>
                <TableCell style={{width:'16rem'}}>{row.priority}</TableCell>
                <TableCell align='center'>
                  <Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Link>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default PeopleTable