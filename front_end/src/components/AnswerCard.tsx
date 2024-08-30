import PersonIcon from '@mui/icons-material/Person'
import { Box, Card, CardContent, Typography } from '@mui/material'

type AnswerCardProps = {
  userName: string
  createdAt: string
  content: string
}

const AnswerCard = (props: AnswerCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <PersonIcon fontSize="large" sx={{ mr: 1, color: '#FF9900' }} />
          <Typography component="p" variant="h6">
            {props.userName}
          </Typography>
        </Box>
        <Typography component="p" variant="body1" sx={{ mb: 2 }}>
          回答日：{props.createdAt}
        </Typography>
        <Typography component="p" variant="body1" sx={{ mb: 2 }}>
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AnswerCard
