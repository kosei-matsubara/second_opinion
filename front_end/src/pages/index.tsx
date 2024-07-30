import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import Error from '@/components/Error'
import { styles } from '@/styles'

const Index: NextPage = () => {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/'
  const { error } = useSWR(url)
  if (error) return <Error />

  return (
    <Box>
      <Head>
        <title>保険のセカンドオピニオン</title>
      </Head>
      <Box component="main" css={styles.pageMinHeight}>
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: '#FFECEC',
              my: 2,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ m: 2 }}>
              <Typography
                component="h1"
                variant="h3"
                sx={{ fontWeight: 'bold' }}
              >
                「保険のセカンドオピニオン」は保険相談ポータルサイトです
              </Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography
                component="p"
                variant="body1"
                sx={{ color: '#828282' }}
              >
                「保険のセカンドオピニオン」は、保険のプロに無料で保険相談できる「みんなの保険相談」や、地域やお悩み内容などから保険のプロを探せる「保険のプロ検索」など、保険の悩みの解決をサポートするコンテンツを多数ご用意しています。
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Link href="/#">
                <Button
                  variant="text"
                  sx={{
                    backgroundColor: '#FFFFFF',
                    boxShadow: 'none',
                    border: '1.5px solid #000000',
                    borderRadius: 1,
                    m: 2,
                    px: 3,
                    py: 2,
                    textTransform: 'none',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000000',
                  }}
                >
                  保険のプロを探す
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: 'custom.h2backgroundColor',
              my: 2,
              p: 1,
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              sx={{ color: 'custom.h2color' }}
            >
              お悩みから解決方法を探す
            </Typography>
          </Box>
          <Grid container spacing={5} sx={{ my: 2 }}>
            <Grid item xs={12} lg={4}>
              <Card>
                <CardContent>
                  <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                      backgroundColor: `red`,
                      p: 2,
                      color: '#FFFFFF',
                    }}
                  >
                    入院・手術1
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
    </Box>
  )
}

export default Index
