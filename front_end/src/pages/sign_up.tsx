import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Stack,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Breadcrumbs from '@/components/Breadcrumbs'
import { validationRules } from '@/components/ValidationRules'
import { useSnackbarState } from '@/hooks/useGlobalState'

type SignUpFormData = {
  email: string
  password: string
  name: string
}

const SignUp: NextPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setSnackbar] = useSnackbarState()
  const steps: string[] = ['会員情報入力', '仮登録完了', '本登録完了'] // StepperのStepを定義する
  const [activeStep] = useState<number>(1) // Stepperの初期値を定義する

  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues: { email: '', password: '', name: '' },
  })

  const onSubmit: SubmitHandler<SignUpFormData> = (formData) => {
    const SignUp = async (formData: SignUpFormData) => {
      setIsLoading(true) // POSTリクエスト送信のためユーザーアクションを不可に制御する

      const postUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth'

      // APIリクエストのheaderを定義する
      const headers = { 'Content-Type': 'application/json' }

      // form入力データをPOSTリクエスト用変数に定義する
      const confirmSuccessUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL + '/sign_in'
      const postData = { ...formData, confirm_success_url: confirmSuccessUrl }

      await axios({
        method: 'POST',
        url: postUrl,
        data: postData,
        headers: headers,
      })
        .then((res: AxiosResponse) => {
          localStorage.setItem('access-token', res.headers['access-token'] || '')
          localStorage.setItem('client', res.headers['client'] || '')
          localStorage.setItem('uid', res.headers['uid'] || '')
          // 認証メール送信通知画面に遷移する
          router.push({
            pathname: '/sign_up_provisional_registration',
            query: { step: activeStep + 1 },
          })
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message)
          setSnackbar({
            message: '不正なユーザー情報です',
            severity: 'error',
            pathname: '/sign_up',
          })
        })
        .finally(() => {
          setIsLoading(false) // POSTリクエスト完了後にユーザーアクションを可能に制御する
        })
    }
    SignUp(formData)
  }

  return (
    <Box>
      <Head>
        <title>会員登録</title>
      </Head>
      <Box>
        <Container maxWidth="sm">
          <Breadcrumbs />
          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
            {steps.map((label: string) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mb: 2 }}>
            <Typography component="h1" variant="h5">
              保険のセカンドオピニオンIDを発行
            </Typography>
          </Box>
          <Stack
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mb: 4 }}
            spacing={2}
            divider={<Divider orientation="horizontal" flexItem />}
          >
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="text"
                  label="メールアドレス"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="password"
                  label="パスワード"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              rules={validationRules.name}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="text"
                  label="名前"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Box>
              <Typography component="p" variant="body2">
                「登録用URLを送信」を押すことにより、以下に同意されるものとします。
                <br />
                ・「利用規約、プライバシーの考え方」を読み、その内容に同意します。
                <br />
                ・保険のセカンドオピニオンから広告・宣伝、その他のお知らせを電子メールで送信することがあります。
                <br />
                <strong>登録に必要なURLを、入力したメールアドレス宛に送信</strong>します。
              </Typography>
            </Box>
            <LoadingButton
              type="submit"
              loading={isLoading}
              variant="contained"
              sx={{
                boxShadow: 'none',
                borderRadius: 1,
                textTransform: 'none',
                fontSize: { xs: 12, sm: 16 },
                fontWeight: 'bold',
              }}
            >
              登録用URLを送信
            </LoadingButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default SignUp
