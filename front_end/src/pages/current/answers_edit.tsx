import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import SendIcon from '@mui/icons-material/Send'
import WarningIcon from '@mui/icons-material/Warning'
import { LoadingButton } from '@mui/lab'
import {
  AppBar,
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import { categoryOptions } from '@/components/CategoryOptions'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { validationRules } from '@/components/ValidationRules'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

// type ProfileProps = {
// }

// type ArticleProps = {
//   categories: string
//   title: string
//   background: string
//   content: string
//   createdAt: string
//   updatedAt: string
// }

type AnswerFormData = {
  content: string
}

const CurrentAnswerEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [previewChecked, setPreviewChecked] = useState<boolean>(false)
  // const steps = ['回答内容入力', '回答内容確認', '回答投稿完了'] // StepperのStepを定義する
  // const [activeStep, setActiveStep] = useState<number>(1) // Stepperの初期値を定義する

  // useFormフックを呼び出しユーザー操作に応じてformの状態と動作を管理する
  const { handleSubmit, control, reset, trigger, watch } = useForm<AnswerFormData>({
    defaultValues: { content: '' },
  })

  // 文字数カウントのためStateを定義する
  const [contentLength, setContentLength] = useState<number>(0)

  // バリデーションチェック後にpreview表示に切り替える関数
  // const handleClickButtonValidation = async () => {
  //   const isValid = await trigger() // バリデーションを実行後にboolean値を返す
  //   isValid ? setPreviewChecked(!previewChecked) : null
  // }

  // preview表示に切り替える関数
  // const handleClickButtonPreview = () => {
  //   setPreviewChecked(!previewChecked)
  // }

  // StepperのStepをカウントアップする
  // const handleNextStep = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1)
  // }

  // StepperのStepをカウントダウンする
  // const handleBackStep = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1)
  // }

  const onSubmit: SubmitHandler<AnswerFormData> = (formData) => {
    setIsLoading(true) // POSTリクエスト送信のためユーザーアクションを不可に制御する

    const posturl = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/answers'

    // APIリクエストのheaderを定義する
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    // form入力データをPATCHリクエスト用変数に定義する
    const articleID = parseInt(router.query.articleID as string, 10)
    const postData = { ...formData, article_id: articleID }

    axios({
      method: 'POST',
      url: posturl,
      data: postData,
      headers: headers,
    })
      .then(() => {
        // 回答投稿完了画面に遷移する
        router.push({
          pathname: '/',
          // query: { step: activeStep + 1 },
        })
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: '回答の投稿が失敗しました',
          severity: 'error',
          pathname: '/current/answers_edit',
        })
      })
      .finally(() => {
        setIsLoading(false) // POSTリクエスト完了後にユーザーアクションを可能に制御する
      })
  }

  // if (error) return <Error />
  // setIsFetched(true)
  // if (!data || !isFetched) return <Loading />
  // const article: CurrentArticleProps = camelcaseKeys(data)

  return (
    <Box>
      <Head>
        <title>相談回答</title>
      </Head>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                保険相談者の保険相談内容に対する回答
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0px 10px',
              }}
            >
              <Typography component="p" variant="h6">
                回答
              </Typography>
              <Typography component="p" variant="body1" sx={{ color: '#FF0000' }}>
                必須
              </Typography>
              <Typography component="p" variant="body1">
                （600文字以内）
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              {/* 相談の背景入力field */}
              <Controller
                name="content"
                control={control}
                rules={validationRules.content}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type="text"
                    error={fieldState.invalid}
                    // validationエラーを出力していない場合は入力文字数を表示する
                    helperText={`${fieldState.error?.message || ''} ${contentLength}/600文字`}
                    onChange={(e) => {
                      field.onChange(e)
                      // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                      setContentLength(e.target.value.length)
                    }}
                    multiline
                    rows={10}
                    fullWidth
                    placeholder="回答を入力"
                  />
                )}
              />
            </Box>
            <LoadingButton
              type="submit"
              loading={isLoading} // Click時にユーザー入力を停止する
              variant="contained"
              sx={{
                width: 150,
                boxShadow: 'none',
                borderRadius: 1,
                textTransform: 'none',
                fontSize: { xs: 12, sm: 16 },
                fontWeight: 'bold',
              }}
            >
              回答する
              <SendIcon fontSize="small" sx={{ ml: 1 }} />
            </LoadingButton>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CurrentAnswerEdit
