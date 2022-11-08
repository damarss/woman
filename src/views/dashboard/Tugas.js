// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'

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
  height: 120,
  position: 'absolute'
})

const Trophy = () => {
  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Jumlah Tugas</Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px' }}>
          yang belum selesai
        </Typography>
        <Typography variant='h2' sx={{ my: 4, color: 'primary.main' }}>
          4
        </Typography>
        <Button size='small' variant='contained'>
          Lihat tugas
        </Button>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        <TaskImg alt='trophy' src='/images/misc/Empty-Files.png' />
      </CardContent>
    </Card>
  )
}

export default Trophy
