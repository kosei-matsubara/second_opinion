import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ArticleIcon from '@mui/icons-material/Article'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import Link from 'next/link'

type UserCardProps = {
  id: number
  name: string
  belong: string
  address: string
  message: string
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
        <Box sx={{ display: 'flex', gap: '0px 10px' }}>
          <AccountBoxIcon sx={{ color: '#CCCCCC', height: '150px', width: '150px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px 0px' }}>
            <Typography component="p" variant="h5">
              {props.name}
            </Typography>
            <Typography component="p" variant="h6">
              {props.belong}
            </Typography>
            <Typography component="p" variant="body1">
              {props.address}
            </Typography>
          </Box>
        </Box>
        <Typography component="p" variant="body1">
          {omitText(props.message, 200)}
        </Typography>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link href={'/insuranceagentlist/' + props.id}>
            <Button
              variant="contained"
              sx={{
                width: 180,
                boxShadow: 'none',
                borderRadius: 1,
                textTransform: 'none',
                fontSize: { xs: 12, sm: 16 },
                fontWeight: 'bold',
              }}
            >
              <ArticleIcon fontSize="small" sx={{ mr: 0.5 }} />
              詳細を見る
            </Button>
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}

export default UserCard
