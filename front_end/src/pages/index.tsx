import Head from 'next/head'
import { Box } from '@mui/material'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Box className={styles.container} css={styles.pageMinHeight} sx={{ backgroundColor: '#e6f2ff' }}>
      <Head>
        <title>ホームページ</title>
        <meta name="description" content="Next.js を使ったホームページの例" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box component="main" className={styles.main} >
        <h1 className={styles.title}>
          Next.js へようこそ！
        </h1>

        <p className={styles.description}>
          このページは Next.js を使って作成されています。
        </p>

        <Box className={styles.grid} >
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>ドキュメント &rarr;</h3>
            <p>Next.js のドキュメントを読む</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>学習 &rarr;</h3>
            <p>Next.js を学ぶためのインタラクティブなコース</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h3>例 &rarr;</h3>
            <p>Next.js のプロジェクト例を見る</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=github&utm_medium=example&utm_campaign=next-example"
            className={styles.card}
          >
            <h3>デプロイ &rarr;</h3>
            <p>Next.js を Vercel にデプロイする</p>
          </a>
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
  );
}
