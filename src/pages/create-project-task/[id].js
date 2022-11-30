// ** React Imports
import { getToken } from 'next-auth/jwt'
import { useState } from 'react'
import prisma from 'src/pages/db'


// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

// ** Meeting Components Imports
import CreateProjectTask from 'src/views/create-project-task/CreateProjectTask'

const CreateProjectTaskPage = ({ data }) => {
  const [project, setProject] = useState(JSON.parse(data))

  return (
    <>
        <CreateProjectTask data={project}/>
    </>
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

  console.log(project)

  return {
    props: {
      data: JSON.stringify(project)
    }
  }
}

export default CreateProjectTaskPage
