// ** MUI Imports
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
    judul: 'Sally Quinn1',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn2',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn3',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn4',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn5',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn6',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn7',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn8',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  }
]

const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const MeetingTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 50 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell align='left' style={{ width: '16rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Meeting Title</Typography>
              </TableCell>
              <TableCell align='center' style={{ width: '16rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Date</Typography>
              </TableCell>
              <TableCell align='center' style={{ width: '16rem' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Start Time</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Meeting Link</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow hover key={row.judul} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell align='left'>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.judul}</Typography>
                </TableCell>
                <TableCell align='center'>{row.tanggal}</TableCell>
                <TableCell align='center'>{row.waktu}</TableCell>
                <TableCell align='center'>{row.link}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default MeetingTable
