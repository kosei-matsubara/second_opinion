import { Box, Typography, Container } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        // width: '50%',
        backgroundColor: '#EEEEEE',
        p: 5,
        display: 'flex',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            mb: 6,
            display: 'flex',
          }}
        >
          {/* 後で以下リンク先ページを作成する */}
          <Link href="#">
            <Typography component="p" variant="body2" sx={{ mx: 1 }}>
              よくあるお問合せ・ヘルプ
            </Typography>
          </Link>
          <Link href="#">
            <Typography component="p" variant="body2" sx={{ mx: 1 }}>
              お問い合わせ窓口
            </Typography>
          </Link>
          <Link href="#">
            <Typography component="p" variant="body2" sx={{ mx: 1 }}>
              利用規約・プライバシーの考え方
            </Typography>
          </Link>
          <Link href="#">
            <Typography component="p" variant="body2" sx={{ mx: 1 }}>
              外部送信規律事項の公表等について
            </Typography>
          </Link>
          <Link href="#">
            <Typography component="p" variant="body2" sx={{ mx: 1 }}>
              特定商取引法に関する表記
            </Typography>
          </Link>
        </Box>
        <Box>
          <Typography component="p" variant="body2">
            © hoken-second-opinion.com 2024
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
