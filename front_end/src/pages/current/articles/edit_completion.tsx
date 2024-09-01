import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HomeIcon from '@mui/icons-material/Home'
import MessageIcon from '@mui/icons-material/Message'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

const CurrentArticleEditCompletion: NextPage = () => {
  const router = useRouter()
  const steps: string[] = ['相談内容入力', '相談内容確認', '相談投稿完了'] // StepperのStepを定義する
  const activeStep = parseInt(router.query.step as string, 10)
  const articleId = parseInt(router.query.id as string, 10)

  return (
    <Box>
      <Head>
        <title>保険相談投稿完了</title>
      </Head>
      <Box component="main">
        <Container maxWidth="md">
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 10, mb: 4 }}>
            {steps.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{
              backgroundColor: '#EEFFFF	',
              mb: 6,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleIcon fontSize="medium" sx={{ mr: 1, color: '#005FFF' }} />
            <Typography component="p" variant="body2">
              相談の投稿が完了しました
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              ご投稿した相談に関する注意書き
            </Typography>
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
              回答について<strong>すべての質問に保険のプロから回答がつくとは限りません</strong>ので、何卒ご理解いただきますようお願いいたします。
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px 0px',
              mb: 4,
            }}
          >
            <Link href={'/current/articles/' + articleId}>
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
                <MessageIcon fontSize="small" sx={{ mr: 0.5 }} />
                投稿した相談へ
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="text"
                sx={{
                  width: 250,
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

export default CurrentArticleEditCompletion
