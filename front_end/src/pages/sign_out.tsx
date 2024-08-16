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
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'
import { styles } from '@/styles'


const SignOut: NextPage = () => {
  const router = useRouter()
  const [, setUser] = useUserState()

  useEffect(() => {
    localStorage.clear()
    setUser({
      id: 0,
      name: '',
      email: '',
      isSignedIn: false,
      isFetched: true,
    })
  }, [router, setUser])

  return (
    <Box>
      <Head>
        <title>サインアウト</title>
      </Head>
      <Box component="main" css={styles.pageMinHeight}>
        <Container maxWidth="lg">
          <Box
            sx={{
              backgroundColor: '#EEEEEE',
              my: 2,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h3" sx={{ fontWeight: 'bold' }}>
              保険のセカンドオピニオンのご利用
              <br />
              ありがとうございました。
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default SignOut
