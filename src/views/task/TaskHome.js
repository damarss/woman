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
import { useRouter } from 'next/dist/client/router'

const statusObj = {
  0: { color: 'secondary', status: 'Assigned' },
  1: { color: 'info', status: 'On Progress' },
  2: { color: 'warning', status: 'Turned In' },
  3: { color: 'primary', status: 'Revision' },
  4: { color: 'success', status: 'Done' },
  5: { color: 'error', status: 'Late' },
  6: { color: 'warning', status: 'Turned In Late' },
  7: { color: 'success', status: 'Done Late' }
}

const priorities = ['Low', 'Medium', 'High']

const TaskHome = props => {
  const router = useRouter()
  
  return (
    <Card>
      <TableContainer sx={{ height: '40vh', overflowY: 'auto' }}>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Task Title</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Project</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Priority</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
                  Deadline
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks.map(row => (
              <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Link onClick={e => router.push(`/task-detail/${row.id}`)} sx={{ cursor: 'pointer' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link onClick={e => router.push(`/project-detail/${row.project.id}`)} sx={{ cursor: 'pointer' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                      {row.project.title}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                    {priorities[row.priority]}
                  </Typography>
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
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
                <TableCell sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                    {new Date(row.duedate).toLocaleDateString('id')}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TaskHome
