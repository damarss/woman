// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import prisma from '../db'
import { getToken } from 'next-auth/jwt'
import { useEffect, useState } from 'react'

// ** Demo Components Imports
import CardProject from 'src/views/cards/CardProject'

const Project = ({ data }) => {
  const [projects, setProjects] = useState([])

  const NotFound = () => (
    <Grid container justifyContent='center' alignItems='center'>
      <Grid item>
        <Typography variant='h6'>Project Not Found</Typography>
      </Grid>
    </Grid>
  )

  useEffect(() => {
    setProjects(JSON.parse(data))
  }, [data])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>My Project</Typography>
      </Grid>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <Grid key={index} item xs={12} md={6}>
            <CardProject project={project.project} />
          </Grid>
        ))
      ) : (
        <NotFound />
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

  let projects
  if (token.role !== 'admin') {
    projects = await prisma.userProject.findMany({
      where: {
        userId: token.uid
      },
      include: {
        project: {
          include: {
            projectLeader: true,
            UserProject: true,
          }
        },
      }
    })
  } else {
    projects = await prisma.userProject.findMany({
      include: {
        project: {
          include: {
            projectLeader: true,
            UserProject: true,
          }
        },
      }
    })
  }

  console.log(projects)

  return {
    props: {
      data: JSON.stringify(projects)
    }
  }
}

export default Project
