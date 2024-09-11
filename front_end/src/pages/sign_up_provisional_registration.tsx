import WarningIcon from '@mui/icons-material/Warning'
import { Box, Container, Stepper, Step, StepLabel, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Breadcrumbs from '@/components/Breadcrumbs'

const SignUpProvisionalRegistration: NextPage = () => {
  const router = useRouter()
  const steps: string[] = ['会員情報入力', '仮登録完了', '本登録完了'] // StepperのStepを定義する
  const activeStep = parseInt(router.query.step as string, 10)

  return (
    <Box>
      <Head>
        <title>仮登録完了</title>
      </Head>
      <Box>
        <Container maxWidth="sm">
          <Breadcrumbs />
          <Stepper activeStep={activeStep} alternativeLabel sx={{ m: 4 }}>
            {steps.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mb: 2 }}>
            <Typography component="h1" variant="h5" sx={{ color: '#D10E0E' }}>
              まだ登録は完了していません
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="p" variant="body2">
              指定のメールアドレスに、本登録用のメールを送信しました。
              <br />
              {/* 通常のWebサービスはURL有効期限を24時間以内などに定義するがテストなどの都合でURL有効期限を延伸している */}
              メールに記載された
              <strong>URLを2週間以内にクリックして登録を完了</strong>
              してください。
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
              メールが届かない場合以下の原因が考えられます。
              <br />
              ・ドメイン指定で「@second_opinion.com」を解除していない。
              <br />
              ・迷惑メールやゴミ箱に入っている。
              <br />
              ・パソコン、スマホ、タブレットからのメール受信を許可していない。
              <br />
              ・URL付きのメール受信を許可していない。
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default SignUpProvisionalRegistration
