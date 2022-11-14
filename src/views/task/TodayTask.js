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
    status: 'current',
    date: '09/27/2018',
    title: 'Sally Quinn',
    salary: '$19586.23',
    priority: 'High',
    project: 'Human Resources Assistant',
  },
  {
    date: '09/23/2016',
    salary: '$23896.35',
    status: 'done',
    title: 'Margaret Bowers',
    priority: 'High',
    project: 'Nuclear Power Engineer'
  },
  {
    date: '10/15/2017',
    title: 'Minnie Roy',
    status: 'revision',
    salary: '$18991.67',
    priority: 'Medium',
    project: 'Environmental Specialist'
  },
  {
    date: '06/12/2018',
    status: 'empty',
    salary: '$19252.12',
    title: 'Ralph Leonard',
    priority: 'High',
    project: 'Sales Representative'
  },
  {
    status: 'applied',
    date: '03/24/2018',
    salary: '$13076.28',
    title: 'Annie Martin',
    project: 'Operator',
    priority: 'Low'
  },
  {
    date: '08/25/2017',
    salary: '$10909.52',
    title: 'Adeline Day',
    status: 'done',
    priority: 'High',
    project: 'Senior Cost Accountant'
  },
  {
    status: 'current',
    date: '06/01/2017',
    salary: '$17803.80',
    title: 'Lora Jackson',
    project: 'Geologist',
    priority: 'High'
  },
  {
    date: '12/03/2017',
    salary: '$12336.17',
    title: 'Rodney Sharp',
    status: 'done',
    project: 'Cost Accountant',
    priority: 'High'
  }
]

const statusObj = {
  applied: { color: 'info' },
  empty: { color: 'error' },
  current: { color: 'primary' },
  revision: { color: 'warning' },
  done: { color: 'success' }
}

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Task Title</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* <TableRow>
              <TableCell>
              Tugas Hari Ini
              </TableCell>
            </TableRow> */}
            {rows.map(row => (
              <TableRow hover key={row.title} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.project}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell><Chip
                    label={row.status}
                    color={statusObj[row.status].color}
                    sx={{
                      height: 24,
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                      '& .MuiChip-label': { fontWeight: 500 }
                    }}
                  /></TableCell>
                <TableCell>{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
