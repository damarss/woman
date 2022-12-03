// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
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

const DashboardTable = props => {
  useEffect(() => {}, [])

  return (
    <Card sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 240, height: 240 }}>
        <Table sx={{ minWidth: 400 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Task Name</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Project</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tasks
              .filter(row => new Date().setHours(0, 0, 0, 0) === new Date(row.duedate).setHours(0, 0, 0, 0))
              .map(row => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Link>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.title}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {row.project.title}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
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

export default DashboardTable
