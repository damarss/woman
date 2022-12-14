// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Demo Components Imports
import CardUser from 'src/views/cards/CardUser'
import CardImgTop from 'src/views/cards/CardImgTop'
import CardMobile from 'src/views/cards/CardMobile'
import CardSupport from 'src/views/cards/CardSupport'
import CardTwitter from 'src/views/cards/CardTwitter'
import CardFacebook from 'src/views/cards/CardFacebook'
import CardLinkedIn from 'src/views/cards/CardLinkedIn'
import CardAppleWatch from 'src/views/cards/CardAppleWatch'
import CardMembership from 'src/views/cards/CardMembership'
import CardInfluencer from 'src/views/cards/CardInfluencer'
import CardNavigation from 'src/views/cards/CardNavigation'
import CardWithCollapse from 'src/views/cards/CardWithCollapse'
import CardVerticalRatings from 'src/views/cards/CardVerticalRatings'
import CardNavigationCenter from 'src/views/cards/CardNavigationCenter'
import CardHorizontalRatings from 'src/views/cards/CardHorizontalRatings'
import CardProject from 'src/views/cards/CardProject'
import CardProjectdetail from 'src/views/cards/CardProjectdetail'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import Tableprojectdetail from 'src/views/tables/Tableprojectdetail'
import OfficeBuildingCog from 'mdi-material-ui//OfficeBuildingCog'

// third party import
import Swal from 'sweetalert2'
import { getToken } from 'next-auth/jwt'
import { useEffect, useState } from 'react'
import prisma from 'src/services/db'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from '../api/axios'

const CardBasic = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))
  const session = useSession()
  const router = useRouter()

  const handleArchive = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, archive it!'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Archived!', 'Your project has been archived.', 'success')

        axios.put(`project/${project.id}`, { isArchived: true }).then(res => {
          if (res.status === 200) {
            router.push('/project')
          }
        })
      }
    })
  }

  const handleUnarchive = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this action!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, unarchive it!'
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Archived!', 'Your project has been unarchived.', 'success')

        axios.put(`project/${project.id}`, { isArchived: false }).then(res => {
          if (res.status === 200) {
            router.push('/project')
          }
        })
      }
    })
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete Project?',
      text: 'Press "Delete Project" to send notification to the the participant',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#68B92E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Project',
      cancelButtonText: 'No, Cancel',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`/project/${project.id}`)
          .then(res => {
            Swal.fire('Deleted', 'Project has been deleted. Press "OK" to continue.', 'success')

            router.push('/project')
          })
          .catch(err => {
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error')
          })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('Cancelled!', 'Project is not deleted. Press "OK" to continue.', 'error')
      }
    })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <CardProjectdetail project={project} />
      </Grid>
      <Grid item xs={12} sm={12} md={4} lg={4} alignItems='center' justify='center'>
        {session.status === 'authenticated' &&
          (session.data.uid == project.projectLeaderId || session.data.uid == 1) && (
            <Button
              sx={{ height: '100%' }}
              fullWidth
              href={`/project-detail-create-project-task/${project.id}`}
              type='submit'
              variant='contained'
              color='primary'
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <OfficeBuildingCog />
                Manage Task
              </Box>
            </Button>
          )}
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <Tableprojectdetail project={project} />
      </Grid>

      {/* Admin */}
      {session.status === 'authenticated' && session.data.role === 'admin' && (
        <Grid item xs={12} sm={12} md={12}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Button
              size='medium'
              type='submit'
              sx={{ mr: 7 }}
              variant='contained'
              color='primary'
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              onClick={e => router.push(`/edit-project/${project.id}`)}
              sx={{ mr: 7 }}
              size='medium'
              type='submit'
              variant='contained'
              color='primary'
            >
              Edit
            </Button>

            <Button
              onClick={project.isArchived ? handleUnarchive : handleArchive}
              size='medium'
              type='submit'
              variant='contained'
              color='primary'
            >
              {project.isArchived ? 'Unarchive' : 'Archive'}
            </Button>
          </Box>
        </Grid>
      )}
    </Grid>
  )
}

export async function getServerSideProps(context) {
  const token = await getToken({ req: context.req, secret: process.env.JWT_SECRET })

  if (!token) {
    return {
      redirect: {
        destination: '/pages/login',
        permanent: false
      }
    }
  }

  const project = await prisma.project.findUnique({
    where: {
      id: parseInt(context.params.id)
    },
    include: {
      Task: {
        include: {
          user: true
        }
      },
      projectLeader: true,
      UserProject: {
        include: {
          user: true
        }
      }
    }
  })

  if (!project) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }

  return {
    props: {
      data: JSON.stringify(project)
    }
  }
}

export default CardBasic
