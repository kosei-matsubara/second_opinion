import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import * as React from 'react'
import '@/styles/destyle.css'
import CurrentUserFetch from '@/components/CurrentUserFetch'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import Snackbar from '@/components/Snackbar'
import createEmotionCache from '@/styles/createEmotionCache'
import theme from '@/styles/theme'

// クライアント側で使用するEmotionのキャッシュを作成する
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* ユーザー認証を行う */}
        <CurrentUserFetch />
        <Header />
        <Component {...pageProps} />
        <ScrollToTop />
        <Footer />
        <Snackbar />
      </ThemeProvider>
    </CacheProvider>
  )
}
