import { FilterList } from '@mui/icons-material'
import { Box, Grid, Container, Pagination, Typography } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Breadcrumbs from '@/components/Breadcrumbs'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import UserCard from '@/components/UserCard'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type ProfileProps = {
  id: number
  name: string
  belong: string
  address: string
  selfIntroduction: string
  myStrength: string
  career: string
  message: string
  access: string
  website: string
  inquiryOpeningTime: string
  inquiryTelephoneNumber: string
}

type ArticleProps = {
  id: number
  title: string
  categories: string
  background: string
  answersCount: number
  fromToday: string
}

type MetaProps = {
  totalCount: number
  totalPages: number
  currentPage: number
}

const InsuranceAgentList: NextPage = () => {
  // ルーターからページ番号を取得し、APIのURLを生成する
  const router = useRouter()
  const page = 'page' in router.query ? Number(router.query.page) : 1
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/users/?page=' + page

  const { data, error } = useSWR(url, fetcher)
  if (error) return <Error />
  if (!data) return <Loading />

  const users: ProfileProps[] = camelcaseKeys(data.users)
  const meta: MetaProps = camelcaseKeys(data.meta)

  // ページネーションの変更ハンドラー
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push('/insuranceagentlist?page=' + value)
  }

  return (
    <Box>
      <Head>
        <title>保険のプロ一覧</title>
      </Head>
      <Box component="main" css={styles.pageMinHeight}>
        <Container maxWidth="lg">
          <Breadcrumbs />
          <Box sx={{ borderBottom: '0.5px solid #000000', p: 2 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              保険のプロ一覧
            </Typography>
          </Box>
          <Box sx={{ borderBottom: '0.5px solid #000000', p: 2 }}>
            <Typography component="p" variant="h6">
              {meta.totalCount}件見つかりました
            </Typography>
          </Box>
          <Box
            sx={{
              borderBottom: '0.5px solid #000000',
              p: 2,
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <FilterList fontSize="small" sx={{ m: 0.5 }} />
            <Typography component="p" variant="h6">
              新着順
            </Typography>
          </Box>
          <Grid
            sx={{ my: 1, display: 'flex', justifyContent: 'center' }}
            container
            spacing={4}
          >
            {users.map((user: ProfileProps, i: number) => (
              <Grid key={i} item xs={7} lg={8}>
                <Link href={'/insuranceagentlist/' + user.id}>
                  <UserCard
                    name={user.name}
                    belong={user.belong}
                    message={user.message}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Pagination
              count={meta.totalPages}
              page={meta.currentPage}
              onChange={handleChange}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default InsuranceAgentList
