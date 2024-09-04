import { Box, Typography, Container } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#EEEEEE', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 2, display: 'flex', gap: '0px 40px' }}>
          <Box>
            <Link href="/">
              <Typography component="p" variant="body2">
                みんなの保険相談
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link href="/insuranceagentlist">
              <Typography component="p" variant="body2">
                保険のプロ一覧
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link href="/current/articles">
              <Typography component="p" variant="body2">
                自分の保険相談一覧
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link href="/current/answers">
              <Typography component="p" variant="body2">
                自分の回答一覧
              </Typography>
            </Link>
          </Box>
          <Box>
            <Link href="/current/profile_edit">
              <Typography component="p" variant="body2">
                プロフィール管理
              </Typography>
            </Link>
          </Box>
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
