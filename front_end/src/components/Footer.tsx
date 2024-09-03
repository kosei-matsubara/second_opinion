import { Box, Typography, Container } from '@mui/material'

const Footer = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: '#EEEEEE', py: 4 }}>
      <Container maxWidth="lg">
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
