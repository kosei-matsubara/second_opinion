import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import HomeIcon from '@mui/icons-material/Home'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Tooltip,
  Typography,
  IconButton,
} from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type AnswerProps = {
  id: number
  content: string
  article: {
    id: number
    categories: string
  }
}

type MetaProps = {
  totalCount: number
}

// テキストが指定長以上の場合はテキスト末尾を省略する
const omitText = (text: string, maxLength: number, ellipsis: string = '...'): string => {
  return text.length >= maxLength ?
  text.slice(0, maxLength - ellipsis.length) + ellipsis :
  text
}

const CurrentAnswers: NextPage = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/answers'
  const { data, error } = useSWR(user.isSignedIn ? url : null, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const answers: AnswerProps[] = camelcaseKeys(data.answers)
  const meta: MetaProps = camelcaseKeys(data.meta)

  return (
    <Box>
      <Head>
        <title>自分の回答一覧</title>
      </Head>
      <Box component="main" css={styles.pageMinHeight}>
        <Container maxWidth="md">
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              自分の回答一覧
            </Typography>
          </Box>
          {data.answers.length === 0 ? ( // APIリクエストにmetaデータを含むためanswers配列に対して0件判定をする
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
                自分の回答がありません。
              </Typography>
            </Box>
          ) : (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography component="p" variant="h6">
                  {meta.totalCount}件見つかりました
                </Typography>
              </Box>
              {answers.map((answer: AnswerProps, i: number) => (
                <>
                  <Box
                    key={i}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: 80,
                    }}
                  >
                    <Box sx={{ width: 200 }}>
                      <Typography
                        component="h2"
                        sx={{
                          fontSize: { xs: 16, sm: 18 },
                          fontWeight: 'bold',
                        }}
                      >
                        {answer.article.categories}
                      </Typography>
                    </Box>
                    <Box sx={{ width: 610 }}>
                      <Typography
                        component="h3"
                        sx={{
                          fontSize: { xs: 16, sm: 18 },
                          fontWeight: 'bold',
                        }}
                      >
                        {omitText(answer.content, 30)}
                      </Typography>
                    </Box>
                    <Box>
                      <Link href={'/current/articles/' + answer.article.id}>
                        <Avatar>
                          <Tooltip title="回答を表示" arrow>
                            <IconButton sx={{ backgroundColor: '#F1F5FA' }}>
                              <ChevronRightIcon sx={{ color: '#99AAB6' }} />
                            </IconButton>
                          </Tooltip>
                        </Avatar>
                      </Link>
                    </Box>
                  </Box>
                  <Divider />
                </>
              ))}
            </Box>
          )}
          <Box
            sx={{
              my: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link href="/">
              <Button
                variant="text"
                sx={{
                  width: 280,
                  boxShadow: 'none',
                  border: '0.5px solid #000000',
                  borderRadius: 1,
                  color: '#000000',
                  textTransform: 'none',
                  fontSize: { xs: 12, sm: 16 },
                  fontWeight: 'bold',
                }}
              >
                <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                トップページへ戻る
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CurrentAnswers
