import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useSession } from 'next-auth/react'
import moment from 'moment'
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

const DataGridProjectDetailTask = props => {
  const router = useRouter()
  const session = useSession()

  const rows = props.project.Task.map(row => ({
    id: row.id,
    username: row.user.name,
    title: row.title,
    priority: priorities[row.priority],
    status: row.status,
    deadline: row.duedate
  }))

  const columns = [
    {
      field: 'title',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Task</Typography>
      ),
      minWidth: 250,
      flex: 1.5,
      renderCell: params => 
        session.status === 'authenticated' &&
          (session.data.uid == props.project.projectLeaderId || session.data.role === 'admin') ? (
            <Link onClick={e => router.push(`/task-detail/${params.row.id}`)} sx={{ cursor: 'pointer' }}>
              <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.row.title}</Typography>
            </Link>
          ): <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.row.title}</Typography>,
      align: 'left'
    },
    {
      field: 'username',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Asigned To
        </Typography>
      ),
      minWidth: 150,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      ),
      align: 'left'
    },
    {
      field: 'priority',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Priority</Typography>
      ),
      minWidth: 150,
      flex: 1,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      )
    },
    {
      field: 'status',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Status</Typography>
      ),
      minWidth: 150,
      flex: 1,
      align: 'left',
      renderCell: params => (
        <Chip
          label={statusObj[params.value].status}
          color={statusObj[params.value].color}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { fontWeight: 500 }
          }}
        />
      )
    },
    {
      field: 'deadline',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Deadline</Typography>
      ),
      minWidth: 150,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
          {moment(params.value).format('DD/MM/YYYY')}
        </Typography>
      ),
      align: 'left'
    }
  ]

  return (
    <Card>
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
          sx={{ height: props.project.Task.length>9 ? '90vh': props.project.Task.length * 50 + 150, overflowY: 'auto', width: '100%'}}
        />
      </Box>
    </Card>
  )
}

export default DataGridProjectDetailTask
