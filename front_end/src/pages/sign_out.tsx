import { Box, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { useUserState } from '@/hooks/useGlobalState'

const SignOut: NextPage = () => {
  const router = useRouter()
  const [, setUser] = useUserState()

  useEffect(() => {
    // localStorageのクリアとサインインデータの初期化を行う
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
      <Box component="main">
        <Container maxWidth="lg">
          <Breadcrumbs />
          <Box
            sx={{
              backgroundColor: '#F9F9F9',
              my: 4,
              py: 2,
              px: 6,
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ color: '#003838', fontWeight: 'bold' }}
              >
                保険のセカンドオピニオンのご利用
                <br />
                ありがとうございました。
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="p" variant="body1" sx={{ color: '#003838' }}>
                「保険のセカンドオピニオン」の運営などについて、ご意見やご質問がございましたらお気軽にお問い合わせください。
                <br />
                今後の運営にあたり、参考にさせていただきます。
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Link
                href="/sign_in"
                style={{
                  color: '#1976D2',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                再度サインインする
              </Link>
            </Box>
            <Box>
              <Link
                href="/"
                style={{
                  color: '#1976D2',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
              >
                トップページに戻る
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default SignOut
