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

const HeadMeetingTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 50 }} aria-label='table in dashboard'>
        <TableHead>
            <TableRow>
              <TableCell align='left' style={{width:'16rem'}}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Meeting Title</Typography>
              </TableCell>
              <TableCell align='center' style={{width:'16rem'}}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Date</Typography></TableCell>
              <TableCell align='center' style={{width:'16rem'}}>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Start Time</Typography></TableCell>
              <TableCell align='center'>
                  <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important' }}>Meeting Link</Typography></TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default HeadMeetingTable
