import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material'

const Main = () => {
  return (
    <Box>
      <Container>
        <Typography variant="h2" sx={{ my: 4 }}>
          イベント・観光（グリッドレイアウト）:
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    backgroundColor: `red`,
                    p: 2,
                    color: '#fff',
                  }}
                >
                  タイトル
                </Typography>
                <Typography variant="body1" sx={{ p: 2 }}>
                  サンプルテキスト
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
