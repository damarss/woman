import * as React from 'react'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Chip from '@mui/material/Chip'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
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

const DataGridDemo = props => {
  const router = useRouter()

  const rows = props.tasks.map(row => ({
    id: row.id,
    project: row.project.title,
    projectid: row.project.id,
    title: row.title,
    priority: priorities[row.priority],
    status: row.status,
    deadline: new Date(row.duedate).toLocaleDateString('id')
  }))

  const columns = [
    {
      field: 'title',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Task Title
        </Typography>
      ),
      width: 290,
      renderCell: params => (
        <Link onClick={e => router.push(`/task-detail/${params.row.id}`)} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.row.title}</Typography>
        </Link>
      ),
      align: 'left',
      editable: true
    },
    {
      field: 'project',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Project
        </Typography>
      ),
      width: 220,
      renderCell: params => (
        <Link onClick={e => router.push(`/project-detail/${params.row.projectid}`)} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
        </Link>
      ),
      align: 'left',
      editable: true
    },
    {
      field: 'priority',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Priority
        </Typography>
      ),
      width: 220,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      ),
      editable: true
    },
    {
      field: 'status',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Status
        </Typography>
      ),
      width: 220,
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
      ),
      editable: true
    },
    {
      field: 'deadline',
      renderHeader: () => (
        <Typography sx={{ fontWeight: 900, fontSize: '0.875rem !important', textAlign: 'center' }}>
          Deadline
        </Typography>
      ),
      width: 100,
      renderCell: params => (
        <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{params.value}</Typography>
      ),
      align: 'left',
      editable: true
    }
  ]

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
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

export default DataGridDemo
