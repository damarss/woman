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
      {projects.length > 0 ? (
        projects.map(project => (
          <Grid key={project.project.id} item xs={12} md={6}>
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
      select: {
        project: {
          select: {
            title: true,
            id: true,
            description: true,
            startdate: true,
            enddate: true,
            isArchived: true,
            projectLeader: true,
            UserProject: true,
            Task: true
          }
        }
      }
    })

    // jika bukan admin maka hanya tampilkan project yang belum diarsipkan
    projects = projects.filter(project => {
      return !project.project.isArchived
    })
  } else {
    const key = []
    projects = []

    const projectsGet = await prisma.userProject.findMany({
      select: {
        project: {
          select: {
            title: true,
            id: true,
            description: true,
            startdate: true,
            enddate: true,
            isArchived: true,
            UserProject: true,
            projectLeader: true,
            UserProject: true,
            Task: true
          }
        }
      }
    })

    projectsGet.map(project => {
      if (key.includes(project.project.id)) {
        return
      }

      key.push(project.project.id)
      projects.push(project)
    })
  }

  projects.map(project => {
    let done = 0

    project.project.Task.map(task => {
      if (task.status == 7) {
        done++
      }
    })

    project.project.progress =
      (done / Number(project.project.Task.length)) * 100 ? (done / Number(project.project.Task.length)) * 100 : 0
  })

  projects.sort((a, b) => {
    return (
      a.project.enddate - b.project.enddate || // urutkan berdasarkan deadline terdekat
      a.project.startdate - b.project.startdate || // urutkan berdasarkan waktu mulai tercepat
      b.project.progress - a.project.progress || // urutkan berdasarkan progress terbesar
      a.project.isArchived - b.project.isArchived // urutkan berdasarkan project yang belum diarsipkan
    )
  })

  return {
    props: {
      data: JSON.stringify(projects)
    }
  }
}

export default Project
