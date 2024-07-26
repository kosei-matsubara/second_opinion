import { Box, Typography, Container } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#EEEEEE',
        py: 6,
      }}
    >
      <Container maxWidth="lg" >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, p: 4, mt: 4 }}>
          <Link href="#" variant="body2" sx={{ mx: 2 }}>
            よくあるお問合せ・ヘルプ
          </Link>
          <Link href="#" variant="body2" sx={{ mx: 2 }}>
            お問い合わせ窓口
          </Link>
          <Link href="#" variant="body2" sx={{ mx: 2 }}>
            利用規約・プライバシーの考え方
          </Link>
          <Link href="#" variant="body2" sx={{ mx: 2 }}>
            外部監査報告事項の公表等について
          </Link>
          <Link href="#" variant="body2" sx={{ mx: 2 }}>
            特定商取引法に関する表記
          </Link>
        </Box>
        <Box>
          <Typography component="p">© hoken-second-opinion.com 2024</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
