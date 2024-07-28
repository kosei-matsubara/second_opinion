import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import Link from 'next/link'

const Main = () => {
  return (
    <Box component="main">
      <Container maxWidth="lg">
        <Box sx={{ backgroundColor: 'custom.h2backgroundColor', p: 1 }}>
          <Typography
            component="h2"
            variant="h6"
            sx={{ color: 'custom.h2color' }}
          >
            お悩みから解決方法を探す
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography
                  component="h3"
                  variant="h7"
                  sx={{
                    backgroundColor: `red`,
                    p: 2,
                    color: '#FFFFFF',
                  }}
                >
                  入院・手術
                </Typography>
                <Typography component="p" variant="body2" sx={{}}>
                  病気
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Main
