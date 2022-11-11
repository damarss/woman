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
    judul: 'Sally Quinn',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn',
    tanggal: '220129129012',
    waktu: 'Sally Quinn',
    link: '220129129012'
  },
  {
    judul: 'Sally Quinn',
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
              <TableCell align='left' style={{width:'16rem'}}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Judul Rapat</Typography></TableCell>
              <TableCell align='center' style={{width:'16rem'}}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Tanggal</Typography></TableCell>
              <TableCell align='center' style={{width:'16rem'}}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Waktu Mulai</Typography></TableCell>
              <TableCell align='center'>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Link Rapat</Typography></TableCell>
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
