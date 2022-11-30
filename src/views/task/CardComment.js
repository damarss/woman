// ** MUI Imports
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import CardComment from 'src/views/task/CardComment'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import StarOutline from 'mdi-material-ui/StarOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import CardActions from '@mui/material/CardActions'
import SendIcon from '@mui/icons-material/Send'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import { useEffect, useRef, useState } from 'react'
import axios from 'src/pages/api/axios'
import Swal from 'sweetalert2'

const CardCommentPageTask = props => {
  const [currentComment, setCurrentComment] = useState('')
  const [comments, setComments] = useState(props.comments.comments)

  const commentTable = useRef(null)

  const handleComment = e => {
    e.preventDefault()

    axios
      .post('taskcomment', {
        comment: currentComment,
        taskId: props.comments.task.id
      })
      .then(res => {
        setCurrentComment('')

        if (res.status === 200) {
          setComments([...comments, res.data.data])
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Comment has been added'
          })
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.response.data.message
        })
      })
  }

  useEffect(() => {
    commentTable.current.scrollTop = commentTable.current.scrollHeight
  }, [comments])

  return (
    <Card>
      <CardHeader title='Private Comment' sx={{ textAlign: 'center', backgroundColor: 'primary.main', paddingY: 3 }} />
      <CardContent>
        {/* box buat komentar*/}
        <Box
          ref={commentTable}
          sx={{ maxHeight: '30vh', minHeight: '30vh', overflowY: 'scroll', marginY: 2, scrollTop: 100 }}
        >
          {comments.length > 0 ? (
            comments.map(comment => (
              <Box key={comment.id} sx={{ display: 'flex', alignItems: 'center', marginY: 3 }}>
                <Avatar
                  alt={comment.user.name}
                  src='/images/avatars/1.png'
                  sx={{ width: 50, height: 50, marginRight: 2.75 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant='body1' sx={{ textAlign: 'left' }}>
                    {comment.user.name}
                  </Typography>
                  <Typography variant='body2' sx={{}}>
                    {comment.comment}
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant='body2' sx={{ textAlign: 'center' }}>
              No Comment
            </Typography>
          )}
        </Box>
        <form onSubmit={handleComment}>
          <FormControl fullWidth>
            <InputLabel htmlFor='send-icon'>Add Private Comment</InputLabel>
            <OutlinedInput
              label='Add Private Comment'
              id='send-icon'
              name='comment'
              value={currentComment}
              onChange={e => setCurrentComment(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton type='submit' edge='end'>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </CardContent>
      <CardActions className='card-action-dense'>
        {/* <Button>Location</Button>
        <Button>Reviews</Button> */}
      </CardActions>
    </Card>
  )
}

export default CardCommentPageTask
