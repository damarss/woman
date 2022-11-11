// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Project Title', 159, 6.0, 24, 4.0),
  createData('Created At', 237, 9.0, 37, 4.3),
  createData('Deadline', 262, 16.0, 24, 6.0),
  createData('Number of Task', 305, 3.7, 67, 4.3),
  createData('Team Leader', 356, 16.0, 49, 3.9)
]

const TableDense = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Project Title</TableCell>
            <TableCell align='right'>Created At</TableCell>
            <TableCell align='right'>Deadline</TableCell>
            <TableCell align='right'>Number of Task</TableCell>
            <TableCell align='right'>Team Leader</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.calories}</TableCell>
              <TableCell align='right'>{row.fat}</TableCell>
              <TableCell align='right'>{row.carbs}</TableCell>
              <TableCell align='right'>{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableDense
