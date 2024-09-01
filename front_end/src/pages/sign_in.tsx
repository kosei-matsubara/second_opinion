import { LoadingButton } from '@mui/lab'
import { Box, Container, Divider, TextField, Typography, Stack } from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import Breadcrumbs from '@/components/Breadcrumbs'
import { validationRules } from '@/components/ValidationRules'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'

type SignInFormData = {
  email: string
  password: string
}

const SignIn: NextPage = () => {
  const router = useRouter()
  const [isGuestLoading, setIsGuestLoading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useUserState()
  const [, setSnackbar] = useSnackbarState()

  const { control, setValue, handleSubmit } = useForm<SignInFormData>({
    defaultValues: { email: '', password: '' },
  })

  // ゲストログインを実行する
  const handleGuestLogin = () => {
    setIsGuestLoading(true) // POSTリクエスト送信のためユーザーアクションを不可に制御する
    setValue('email', 'guest@example.com') // ゲストユーザーのemailアドレスを自動入力する
    setValue('password', 'guestpassword') // ゲストユーザーのpasswordを自動入力する
    handleSubmit(onSubmit)()
  }

  const onSubmit: SubmitHandler<SignInFormData> = (formData) => {
    setIsLoading(true) // POSTリクエスト送信のためユーザーアクションを不可に制御する

    const postUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
    // APIリクエストのheaderを定義する
    const headers = { 'Content-Type': 'application/json' }

    axios({
      method: 'POST',
      url: postUrl,
      data: formData,
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        localStorage.setItem('access-token', res.headers['access-token'])
        localStorage.setItem('client', res.headers['client'])
        localStorage.setItem('uid', res.headers['uid'])
        setUser({
          ...user,
          isFetched: false,
        })
        setSnackbar({
          message: 'サインインに成功しました',
          severity: 'success',
          pathname: '/',
        })
        router.push('/')
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: '登録ユーザーが見つかりません',
          severity: 'error',
          pathname: '/sign_in',
        })
      })
      // POSTリクエスト完了後にユーザーアクションを可能に制御する
      .finally(() => {
        setIsLoading(false)
        setIsGuestLoading(false)
      })
  }

  return (
    <Box>
      <Head>
        <title>サインイン</title>
      </Head>
      <Box>
        <Container maxWidth="sm">
          <Breadcrumbs />
          <Box sx={{ my: 2 }}>
            <Typography component="h1" variant="h5">
              サインインする
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
              送信する
            </LoadingButton>
            <LoadingButton
              onClick={handleGuestLogin}
              loading={isGuestLoading}
              variant="text"
              sx={{
                boxShadow: 'none',
                border: '0.5px solid #000000',
                borderRadius: 1,
                textTransform: 'none',
                fontSize: { xs: 12, sm: 16 },
                fontWeight: 'bold',
                color: '#000000',
              }}
            >
              ゲストサインイン
            </LoadingButton>
            <Box>
              <Typography component="p" variant="body2">
                アカウントをお持ちでない方は
                <Link
                  href="/sign_up"
                  style={{
                    color: '#1976D2',
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  無料会員登録
                </Link>
                をしてください。
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default SignIn
