// ** MUI Imports
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Link from '@mui/material/Link'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import moment from 'moment'


const statusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const MeetingTable = props => {
  let startDate
  let endDate
  let link
  const router = useRouter()

  const rows = props.data.map(row => ({
    id: row.id,
    startDate: new Date(row.startDate).toLocaleDateString("en-EN", options) + " at " + new Date(row.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    endDate: new Date(row.endDate).toLocaleDateString("en-EN", options) + " at " + new Date(row.endDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    link: row.link,
    title: row.title,
    duration: row.duration,
    description: row.description
  }))

  const columns = [
    {
      field: 'title',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Meeting Title
        </Typography>
      ),
      minWidth: 230,
      flex: 1.2,
      renderCell: params => (
        <Link onClick={e => router.push(`/meeting-admin-detail/${params.row.id}`)} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.row.title}</Typography>
        </Link>
      ),
      align: 'left',
      editable: true
    },
    {
      field: 'startDate',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Start Date</Typography>
      ),
      minWidth: 290,
      flex: 1,
      renderCell: params => (
        <Link onClick={e => router.push(`/meeting-admin-detail/${params.row.id}`)} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
        </Link>
      ),
      align: 'left',
      editable: true
    },
    {
      field: 'endDate',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>End Date</Typography>
      ),
      minWidth: 290,
      flex: 1,
      renderCell: params => (
        <Link onClick={e => router.push(`/meeting-admin-detail/${params.row.id}`)} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
        </Link>
      ),
      editable: true
    },
    {
      field: 'link',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Meeting Link</Typography>
      ),
      width: 150,
      flex: 0.8,
      renderCell: params => (
        <Link href={params.value}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
        </Link>
      ),
      align: 'left',
      editable: true
    }
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        initialState={{
          sorting: {
            sortModel: [{ field: 'deadline', sort: 'asc' }]
          }
        }}
        rows={rows}
        columns={columns}
        pprioritySize={5}
        rowsPerPpriorityOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        sx={{ height: props.height, overflowY: 'auto', width: '100%' }}
      />
    </Box>
  )
}

export default MeetingTable
