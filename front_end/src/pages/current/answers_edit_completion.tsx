import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HomeIcon from '@mui/icons-material/Home'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'
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

const CurrentAnswerEditCompletion: NextPage = () => {
  const router = useRouter()
  const steps: string[] = ['回答内容入力', '回答内容確認', '回答投稿完了'] // StepperのStepを定義する
  const activeStep = parseInt(router.query.step as string, 10)
  const articleId = parseInt(router.query.articleId as string, 10)

  return (
    <Box>
      <Head>
        <title>回答投稿完了</title>
      </Head>
      <Box component="main">
        <Container maxWidth="md">
          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
            {steps.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{
              backgroundColor: '#EEFFFF',
              mb: 6,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleIcon fontSize="medium" sx={{ mr: 1, color: '#005FFF' }} />
            <Typography component="p" variant="body2">
              回答の投稿が完了しました
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              ご投稿した回答に関する注意書き
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
              回答について
              <strong>すべての回答に相談者からお問い合わせがあるとは限りません</strong>
              ので、何卒ご理解いただきますようお願いいたします。
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
            <Link href={'/' + articleId}>
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
                <QuestionAnswerIcon fontSize="small" sx={{ mr: 0.5 }} />
                投稿した回答へ
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

export default CurrentAnswerEditCompletion
