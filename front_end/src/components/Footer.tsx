import { Box, Typography, Container } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#EEEEEE',
        display: 'flex',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
          }}
        >
          {/* 後で以下リンク先ページを作成する */}
          <Box sx={{ m: 2 }}>
            <Link href="#">
              <Typography component="p" variant="body2">
                よくあるお問合せ・ヘルプ
              </Typography>
            </Link>
          </Box>
          <Box sx={{ m: 2 }}>
            <Link href="#">
              <Typography component="p" variant="body2">
                お問い合わせ窓口
              </Typography>
            </Link>
          </Box>
          <Box sx={{ m: 2 }}>
            <Link href="#">
              <Typography component="p" variant="body2">
                利用規約・プライバシーの考え方
              </Typography>
            </Link>
          </Box>
          <Box sx={{ m: 2 }}>
            <Link href="#">
              <Typography component="p" variant="body2">
                外部送信規律事項の公表等について
              </Typography>
            </Link>
          </Box>
          <Box sx={{ m: 2 }}>
            <Link href="#">
              <Typography component="p" variant="body2">
                特定商取引法に関する表記
              </Typography>
            </Link>
          </Box>
        </Box>
        <Box sx={{ m: 2 }}>
          <Typography component="p" variant="body2">
            © hoken-second-opinion.com 2024
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
