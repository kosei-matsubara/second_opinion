import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { Box, Card, CardContent, Typography } from '@mui/material'

type UserCardProps = {
  id: number
  name: string
  belong: string
  address: string
  selfIntroduction: string
  myStrength: string
  career: string
  message: string
  access: string
  website: string
  inquiryOpeningTime: string
  inquiryTelephoneNumber: string
}

// テキストが指定長以上の場合はテキスト末尾を省略する
const omitText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  return text.length >= maxLength ?
  text.slice(0, maxLength - ellipsis.length) + ellipsis :
  text
}

const UserCard = (props: UserCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <AccountBoxIcon fontSize="large" sx={{ mr: 1, color: '#005FFF' }} />
          <Typography component="h3" sx={{ fontSize: 16, fontWeight: 'bold' }}>
            {omitText(props.name, 20)}
          </Typography>
          <Typography component="h2" variant="h6">
            {props.categories}
          </Typography>
        </Box>
        <Typography component="p" variant="body1" sx={{ mb: 2 }}>
          {omitText(props.belong, 200)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="p" variant="body2">
            相談日：{props.message}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserCard
