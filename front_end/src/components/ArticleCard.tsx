import { Box, Card, CardContent, Typography } from '@mui/material'

type ArticleCardProps = {
  title: string
  categories: string
  background: string
  answersCount: number
  fromToday: string
}

// テキストが指定長以上の場合はテキスト末尾を省略する
const omitText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  return text.length >= maxLength ?
  text.slice(0, maxLength - ellipsis.length) + ellipsis :
  text
}

const ArticleCard = (props: ArticleCardProps) => {
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
            {omitText(props.title, 20)}
          </Typography>
          <Typography component="h2" variant="h6">
            {props.categories}
          </Typography>
        </Box>
        <Typography component="p" variant="body1" sx={{ mb: 2 }}>
          {omitText(props.background, 200)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="p" variant="body2">
            保険のプロ回答：{props.answersCount}件
          </Typography>
          <Typography component="p" variant="body2">
            相談日：{props.fromToday}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ArticleCard
