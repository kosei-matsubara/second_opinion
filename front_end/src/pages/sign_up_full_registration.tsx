import InfoIcon from '@mui/icons-material/Info'
import { Box, Container, Stepper, Step, StepLabel, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'

const SignUpFullRegistration: NextPage = () => {
  const steps: string[] = ['会員情報入力', '仮登録完了', '本登録完了'] // StepperのStepを定義する
  const [activeStep] = useState<number>(3) // Stepperの初期値を定義する

  return (
    <Box>
      <Head>
        <title>本登録完了</title>
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
            <Typography component="h1" variant="h5">
              登録が完了しました
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="p" variant="body2">
              ありがとうございます。ご登録が完了しました。
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#EEFFFF	',
              mb: 4,
              p: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <InfoIcon fontSize="large" sx={{ mr: 1, color: '#005FFF' }} />
            <Typography component="p" variant="body2">
              次に「プロフィール情報」を設定してください。
              <br />
              「プロフィール情報」を設定いただくと、保険のプロからより回答な正確を得やすくなります。
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default SignUpFullRegistration
