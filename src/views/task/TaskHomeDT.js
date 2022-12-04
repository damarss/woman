import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/dist/client/router'
import moment from 'moment'
import axios from 'src/pages/api/axios'
import { useSession } from 'next-auth/react'

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

const DataGridDemo = props => {
  const router = useRouter()

  const session = useSession()

  const rows = props.tasks.map(row => ({
    id: row.id,
    project: row.project.title,
    projectid: row.project.id,
    title: row.title,
    priority: priorities[row.priority],
    status: row.status,
    deadline: row.duedate,
    userId: row.userId,
  }))

  const columns = [
    {
      field: 'title',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Task Title
        </Typography>
      ),
      minWidth: 250,
      flex: 1.5,
      renderCell: params => (
        <Link
          onClick={async e => {
            if (session.status === 'authenticated' && session.data.uid == params.row.userId) {
              if (params.row.status === 0) {
                await axios.put(`task/${params.row.id}`, { status: 1, helper: 'onprogress' })
              }
            }
            router.push(`/task-detail/${params.row.id}`)
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.row.title}</Typography>
        </Link>
      ),
      align: 'left'
    },
    {
      field: 'project',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>Project</Typography>
      ),
      minWidth: 150,
      flex: 1,
      renderCell: params => (
        <Link onClick={e => router.push(`/project-detail/${params.row.projectid}`)} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
        </Link>
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
        sx={{ height: props.height, overflowY: 'auto', width: '100%', paddingRight: '30px' }}
      />
    </Box>
  )
}

export default DataGridDemo
