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

const statusObj = {
  0: { color: 'default', status: 'Assign' },
  1: { color: 'error', status: 'Revision' },
  2: { color: 'primary', status: 'Turned In' },
  3: { color: 'warning', status: 'Done' },
  4: { color: 'success', status: 'Approved' }
}

const priorities = ['Low', 'Medium', 'High']

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

const PeopleTable = props => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 10 }} aria-label='table in dashboard'>
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
            {props.project.Task.map(row => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell style={{ width: '12rem' }}>
                  <Link href={`/task-detail/${props.project.id}`}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                  </Link>
                </TableCell>
                <TableCell style={{ width: '16rem' }}>{row.user.name}</TableCell>
                <TableCell style={{ width: '16rem' }}>{priorities[row.priority]}</TableCell>
                <TableCell align='center'>
                  <Chip
                    label={statusObj[row.status].status}
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
        </Table>
      </TableContainer>
    </Card>
  )
}

export default PeopleTable
