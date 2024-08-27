import { Box, Card, CardContent, Typography } from '@mui/material'

type AnswerCardProps = {
  userName: string
  createdAt: string
  updatedAt: string
  content: string
}

// テキストが指定長以上の場合はテキスト末尾を省略する
const omitText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  return text.length >= maxLength ?
  text.slice(0, maxLength - ellipsis.length) + ellipsis :
  text
}

const AnswerCard = (props: AnswerCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            component="h3"
            sx={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#315BBB',
            }}
          >
            {props.userName}
          </Typography>
        </Box>
        <Typography component="p" variant="body1" sx={{ mb: 2 }}>
          回答日：{props.createdAt}
        </Typography>
        <Typography component="p" variant="body1" sx={{ mb: 2 }}>
          {omitText(props.content, 200)}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AnswerCard
