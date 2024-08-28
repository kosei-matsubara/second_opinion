import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Container, Typography, Divider, Grid, Button } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import AnswerCard from '@/components/AnswerCard'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { fetcher } from '@/utils'

type ArticleProps = {
  categories: string
  title: string
  background: string
  content: string
  createdAt: string
  updatedAt: string
}

type AnswerProps = {
  user: {
    name: string
  }
  content: string
  createdAt: string
}

const ArticleDetail: NextPage = () => {
  const router = useRouter()

  // URLパラメータからArticleIDを取得する
  const { id } = router.query

  // Articleデータを取得する
  const articleUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`
  const { data: articleData, error: articleError } = useSWR(id ? articleUrl : null, fetcher)

  // ArticleIDに一致するAnswerデータを取得する
  const answerUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/answers?article_id=${id}`
  const { data: answersData, error: answerError } = useSWR(id ? answerUrl : null, fetcher)

  if (articleError || answerError) return <Error />
  if (!articleData) return <Loading />

  const article: ArticleProps = camelcaseKeys(articleData)
  // answersデータが0件の場合はnullを返してエラーを回避する
  const answers: AnswerProps[] = answersData?.answers ? camelcaseKeys(answersData.answers) : [];

  return (
    <Box>
      <Head>
        <title>保険相談詳細</title>
      </Head>
      <Box component="main">
        <Container maxWidth="md">
          <Box sx={{ my: 6 }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              {article.title}
            </Typography>
            <Typography component="p" variant="body1" sx={{ color: '#AAAAAA' }}>
              相談日：{article.createdAt}
            </Typography>
          </Box>
          <Box>
            <Typography component="p" variant="h6">
              【相談カテゴリ】
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography component="p" variant="body1">
              {article.categories}
            </Typography>
          </Box>
          <Box>
            <Typography component="p" variant="h6">
              【相談の背景】
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography component="p" variant="body1">
              {article.background}
            </Typography>
          </Box>
          <Box>
            <Typography component="p" variant="h6">
              【質問】
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography component="p" variant="body1">
              {article.content}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ my: 6 }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
              回答タイムライン
            </Typography>
          </Box>
          {/* answersデータの取得有無を判定する */}
          {!answersData ? (
            <Loading />
          ) : answersData.answers.length === 0 ? ( // APIリクエストにmetaデータを含むためanswers配列に対して0件判定をする
            <Box
              sx={{
                backgroundColor: '#FFFFCC',
                p: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <WarningIcon fontSize="large" sx={{ mr: 1, color: '#FF9900' }} />
              <Typography component="p" variant="body2">
                まだ保険のプロから回答がありません。
              </Typography>
            </Box>
          ) : (
            <Grid
              sx={{ display: 'flex', justifyContent: 'center' }}
              container
              spacing={4}
            >
              {answers.map((answer: AnswerProps, i: number) => (
                <Grid key={i} item xs={10} md={11}>
                  <AnswerCard
                    userName={answer.user.name}
                    createdAt={answer.createdAt}
                    content={answer.content}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          <Box sx={{ my: 4, display: 'flex', justifyContent: 'center' }}>
            <Link href="/">
              <Button
                variant="contained"
                sx={{
                  width: 250,
                  boxShadow: 'none',
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: { xs: 12, sm: 16 },
                  fontWeight: 'bold',
                }}
              >
                <QuestionAnswerIcon fontSize="small" sx={{ mr: 1 }} />
                保険相談に回答する
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default ArticleDetail
