// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/dist/client/router'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

// Styled component for the trophy image
const TaskImg = styled('img')({
  right: 32,
  bottom: 20,
  height: 150,
  position: 'absolute'
})

const Trophy = props => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  const router = useRouter()

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          minHeight: 300,
          padding: theme => `${theme.spacing(9.75, 5, 9.25)} !important`
        }}
      >
        <Typography variant='h6'>My Tasks</Typography>
        <Typography variant='h1' sx={{ my: 2, color: 'primary.main' }}>
          {props.taskNumber}
        </Typography>
        <Button size='medium' variant='contained' onClick={e => router.push('/task')}>
          Show tasks
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
      </CardContent>
    </Card>
  )
}

export default Trophy
