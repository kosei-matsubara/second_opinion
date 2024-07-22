import { Box, Typography, Card, CardContent } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Box className={styles.container}>
      <Head>
        <title>ホームページ</title>
        <meta name="description" content="Next.js を使ったホームページの例" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box component="main" className={styles.main}>
        <Box sx={{ textAlign: 'center', backgroundColor: '#FFECEC' }}>
          <Typography component="h1" sx={{ fontSize: 32, fontWeight: 'bold' }}>
            「保険のセカンドオピニオン」は保険相談ポータルサイトです
          </Typography>
          <Typography component="p" sx={{ fontSize: 15, color: '#828282'}}>
            「保険のセカンドオピニオン」は、保険のプロに無料で保険相談できる「みんなの保険相談」や、地域やお悩み内容などから保険のプロを探せる「保険のプロ検索」など、保険の悩みの解決をサポートするコンテンツを多数ご用意しています。
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <nav>
              <ul>
                <li>
                  <Link href={''}>Home</Link>
                </li>
                <li>
                  <Link href={''}>Home</Link>
                </li>
              </ul>
            </nav>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: '#F46969' }}>
          <Typography
            component="h2"
            sx={{ fontSize: 32, color: '#FFFFFF', fontWeight: 'bold' }}
          >
            お悩みから解決方法を探す
          </Typography>
        </Box>
        <Box>
          <Card
            sx={{
              border: '5px solid #000000',
              borderRadius: '12px',
              m: '0 auto',
            }}
          >
            <Box
              sx={{
                padding: { xs: '0 24px 24px 24px', sm: '0 40px 40px 40px' },
                marginTop: { xs: '24px', sm: '40px' },
              }}
            >
              <CardContent sx={{ lineHeight: 2 }}>
                <Typography
                  component="h3"
                  sx={{ fontSize: 32, fontWeight: 'bold' }}
                >
                  入院・手術
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Box>
      </Box>

      <Box component="footer" className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=github&utm_medium=example&utm_campaign=next-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </Box>
    </Box>
  )
}
