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
import { useEffect } from 'react'

const rows = [
  {
    status: 'on_progress',
    date: '09/27/2018',
    title: 'Sally Quinn',
    salary: '$19586.23',
    priority: 'High',
    project: 'Human Resources Assistant'
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
    status: 'late',
    salary: '$19252.12',
    title: 'Ralph Leonard',
    priority: 'High',
    project: 'Sales Representative'
  },
  {
    status: 'assigned',
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
    status: 'turned_in',
    priority: 'High',
    project: 'Senior Cost Accountant'
  },
  {
    status: 'on_progress',
    date: '06/01/2017',
    salary: '$17803.80',
    title: 'Lora Jackson',
    project: 'Geologist',
    priority: 'High'
  },
  {
    date: '12/03/2017',
    title: 'Rodney Sharp',
    status: 'turned_in_late',
    project: 'Cost Accountant',
    priority: 'High'
  }
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const DashboardTable = props => {
  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 250 }}>
        <Table sx={{ minWidth: 400 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Project</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map(row => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.project.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
