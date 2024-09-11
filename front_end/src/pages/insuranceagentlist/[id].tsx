import AccountBoxIcon from '@mui/icons-material/AccountBox'
import MailIcon from '@mui/icons-material/Mail'
import WarningIcon from '@mui/icons-material/Warning'
import { Box, Container, Typography, Button } from '@mui/material'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { fetcher } from '@/utils'

type ProfileProps = {
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

const UserDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query // URLパラメータからUserIDを取得する

  const userUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`
  const { data, error } = useSWR(id ? userUrl : null, fetcher)

  if (error) return <Error />
  if (!data) return <Loading />

  const user: ProfileProps = camelcaseKeys(data)

  return (
    <Box>
      <Head>
        <title>プロフィール情報詳細</title>
      </Head>
      <Box component="main">
        <Container maxWidth="md">
          <Box>
            <Box sx={{ mt: 4 }}>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                プロフィール詳細を確認する
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                人物紹介
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: '0px 10px' }}>
              <AccountBoxIcon
                sx={{ color: '#CCCCCC', height: '150px', width: '150px' }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px 0px' }}>
                <Typography component="p" variant="body1">
                  {user.name}
                </Typography>
                <Typography component="p" variant="body1">
                  {user.belong}
                </Typography>
                <Typography component="p" variant="body1">
                  {user.address}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                自己紹介
              </Typography>
            </Box>
            <Box>
              <Typography component="p" variant="body1">
                {user.selfIntroduction}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                わたしの強み
              </Typography>
            </Box>
            <Box>
              <Typography component="p" variant="body1">
                {user.myStrength}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                経歴
              </Typography>
            </Box>
            <Box>
              <Typography component="p" variant="body1">
                {user.career}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                相談者へのメッセージ
              </Typography>
            </Box>
            <Box>
              <Typography component="p" variant="body1">
                {user.message}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                アクセス
              </Typography>
            </Box>
            <Box>
              <Typography component="p" variant="body1">
                {user.access}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                弊社ホームページ
              </Typography>
            </Box>
            <Box>
              <Typography component="p" variant="body1">
                {user.website}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: 'custom.h2backgroundColor',
                borderRadius: 1,
                my: 4,
                p: 1,
              }}
            >
              <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                お問い合わせ
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#EEFFFF	',
                mb: 4,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0px 20px',
              }}
            >
              <Typography component="p" variant="body1">
                受付時間
              </Typography>
              <Typography component="p" variant="body1">
                {user.inquiryOpeningTime}
              </Typography>
              <Typography component="p" variant="body1">
                電話番号
              </Typography>
              <Typography component="p" variant="body1">
                {user.inquiryTelephoneNumber}
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  width: 480,
                  boxShadow: 'none',
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: { xs: 12, sm: 16 },
                  fontWeight: 'bold',
                }}
              >
                <MailIcon fontSize="small" sx={{ mr: 0.5 }} />
                保険のプロにダイレクトメッセージを送信する（実装中）
              </Button>
            </Box>
            <Box
              sx={{
                backgroundColor: '#FFFFCC',
                mb: 4,
                p: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <WarningIcon fontSize="large" sx={{ mr: 1, color: '#FF9900' }} />
              <Typography component="p" variant="body2">
                ・保険のプロへの営業・勧誘などのお問い合わせは固くお断りさせて頂いております。
                <br />
                ・お問い合わせ内容は保険のプロにのみ提供されます。サイト上に公開されたり、第三者に提供されることはありません。
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default UserDetail
