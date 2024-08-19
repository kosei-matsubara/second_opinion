import { Card, CardContent, Container, Typography } from '@mui/material'
import { styles } from '@/styles'

const Error = () => {
  return (
    <Container
      maxWidth="sm"
      css={styles.pageMinHeight} // Errorを表示中、画面内にFooterを表示しないようMinHeightを定義する
    >
      <Card sx={{ backgroundColor: '#EEEEEE', transform: 'translateY(100%)' }}>
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
