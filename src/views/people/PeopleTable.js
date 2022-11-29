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

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const PeopleTable = ({ rows }) => {
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
            {props.users.map(users => (
              <TableRow hover key={users.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell align='left' style={{ width: '16rem' }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{users.name}</Typography>
                </TableCell>
                <TableCell align='center' style={{ width: '16rem' }}>
                  {row.project}
                </TableCell>
                <TableCell align='center' style={{ width: '16rem' }}>
                  {row.task}
                </TableCell>
                <TableCell align='center'>
                  <form onSubmit={e => e.preventDefault()}>
                    <FormControl fullWidth>
                      <InputLabel id='form-layouts-separator-select-label'>role</InputLabel>
                      <Select
                        label='role'
                        defaultValue={users.role}
                        id='form-layouts-separator-role'
                        labelId='form-layouts-separator-role-label'
                      >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='employee'>Employee</MenuItem>
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
