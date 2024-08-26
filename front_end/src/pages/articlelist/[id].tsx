import ArticleIcon from '@mui/icons-material/Article'
import PersonIcon from '@mui/icons-material/Person'
import UpdateIcon from '@mui/icons-material/Update'
import {
  Box,
  Container,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
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
  user: {
    name: string
  }
}

const ArticleDetail: NextPage = () => {
  const router = useRouter()

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/articles/'
  const { id } = router.query
  const { data, error } = useSWR(id ? url + id : null, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const article: ArticleProps = camelcaseKeys(data)

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
            <Typography component="P" variant="body1" sx={{ color: '#AAAAAA' }}>
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
          {/* <Grid
            sx={{ my: 1, display: 'flex', justifyContent: 'center' }}
            container
            spacing={4}
          >
            {articles.map((article: ArticleProps, i: number) => (
              <Grid key={i} item xs={7} lg={8}>
                <Link href={'/articlelist/' + article.id}>
                  <ArticleCard
                    title={article.title}
                    categories={article.categories}
                    background={article.background}
                    fromToday={article.fromToday}
                  />
                </Link>
              </Grid>
            ))}
          </Grid> */}
        </Container>
      </Box>
    </Box>
  )
}

export default ArticleDetail
