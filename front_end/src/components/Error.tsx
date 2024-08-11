import { Card, CardContent, Container, Typography } from '@mui/material'

const Error = () => {
  return (
    <Container maxWidth="sm">
      <Card sx={{ backgroundColor: '#EEEEEE', my: 30 }}>
        <CardContent sx={{ m: 2 }}>
          <Typography component="p" variant="h6">
            現在、システムに技術的な問題が発生しています。ご不便をおかけして申し訳ありませんが復旧までしばらくお待ちください。
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default Error
