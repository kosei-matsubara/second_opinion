import { Box, Container, Typography, Card, Divider, Grid } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
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
  content: string
  createdAt: string
  updatedAt: string
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
  const answers: AnswerProps[] = camelcaseKeys(answersData || [])

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
          {/* answersデータが0件の場合の画面を表示する */}
          {/* {answers?.length === 0 && ( */}
          {answers.length === 0 ? (
            <Typography component="p" variant="body1">
              回答がまだありません。
            </Typography>
          ) : (
            <Grid
              sx={{ my: 1, display: 'flex', justifyContent: 'center' }}
              container
              spacing={4}
            >
              {answers.map((answer: AnswerProps, i: number) => (
                <Grid key={i} item xs={7} lg={8}>
                  <AnswerCard
                    // name={answerData.name}
                    createdAt={answer.createdAt}
                    content={answer.content}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default ArticleDetail
