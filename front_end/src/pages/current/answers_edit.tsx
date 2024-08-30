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
  Divider,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  Button,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
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
import { ContactMailOutlined } from '@mui/icons-material'

type ProfileProps = {
  sex: string
  generation: string
  familyStructure: string
  prefectures: string
}

type ArticleProps = {
  categories: string
  title: string
  background: string
  content: string
  createdAt: string
  updatedAt: string
}

type AnswerFormData = {
  content: string
}

const CurrentAnswerEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [previewChecked, setPreviewChecked] = useState<boolean>(false)
  const steps = ['回答内容入力', '回答内容確認', '回答投稿完了'] // StepperのStepを定義する
  const [activeStep, setActiveStep] = useState<number>(1) // Stepperの初期値を定義する
  const articleId = parseInt(router.query.articleID as string, 10)

  // Articleデータを取得する
  const articleUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${articleId}`
  const { data, error } = useSWR(articleId ? articleUrl : null, fetcher)

  // useFormフックを呼び出しユーザー操作に応じてformの状態と動作を管理する
  const { handleSubmit, control, trigger, watch } = useForm<AnswerFormData>({
    defaultValues: { content: '' },
  })

  // 文字数カウントのためStateを定義する
  const [contentLength, setContentLength] = useState<number>(0)

  if (error) return <Error />
  if (!data) return <Loading />

  const profile: ProfileProps = camelcaseKeys(data.user)
  const article: ArticleProps = camelcaseKeys(data)

  // バリデーションチェック後にpreview表示に切り替える関数
  const handleClickButtonValidation = async () => {
    const isValid = await trigger() // バリデーションを実行後にboolean値を返す
    isValid ? setPreviewChecked(!previewChecked) : null
  }

  // preview表示に切り替える関数
  const handleClickButtonPreview = () => {
    setPreviewChecked(!previewChecked)
  }

  // StepperのStepをカウントアップする
  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // StepperのStepをカウントダウンする
  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const onSubmit: SubmitHandler<AnswerFormData> = (formData) => {
    setIsLoading(true) // POSTリクエスト送信のためユーザーアクションを不可に制御する

    const postUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/answers'

    // APIリクエストのheaderを定義する
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    // form入力データをPOSTリクエスト用変数に定義する
    const articleID = parseInt(router.query.articleID as string, 10)
    const postData = { ...formData, article_id: articleID }

    axios({
      method: 'POST',
      url: postUrl,
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

  return (
    <Box>
      <Head>
        <title>相談回答</title>
      </Head>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mb: 2 }}>
            <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
              保険相談のプロフィール情報
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px 140px' }}>
            <Typography component="p" variant="h6">
              性別
            </Typography>
            <Typography component="p" variant="body1">
              {profile.sex}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px 140px' }}>
            <Typography component="p" variant="h6">
              年代
            </Typography>
            <Typography component="p" variant="body1">
              {profile.generation}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px 100px' }}>
            <Typography component="p" variant="h6">
              家族構成
            </Typography>
            <Typography component="p" variant="body1">
              {profile.familyStructure}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0px 100px' }}>
            <Typography component="p" variant="h6">
              都道府県
            </Typography>
            <Typography component="p" variant="body1">
              {profile.prefectures}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ my: 6 }}>
            <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
              {article.title}
            </Typography>
            <Typography component="p" variant="body1" sx={{ color: '#AAAAAA' }}>
              相談日：{article.createdAt}
            </Typography>
          </Box>
          <Box>
            <Typography component="p" variant="h6">
              【相談カテゴリ】
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography component="p" variant="body1">
              {article.categories}
            </Typography>
          </Box>
          <Box>
            <Typography component="p" variant="h6">
              【相談の背景】
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography component="p" variant="body1">
              {article.background}
            </Typography>
          </Box>
          <Box>
            <Typography component="p" variant="h6">
              【質問】
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography component="p" variant="body1">
              {article.content}
            </Typography>
          </Box>
          <Divider sx={{ mb: 6 }} />
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="h2" variant="h5" sx={{ fontWeight: 'bold' }}>
                保険相談に回答する
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
                rules={validationRules.answerContent}
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
            <Box
              sx={{
                backgroundColor: '#EEFFFF	',
                mb: 6,
                p: 2,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon fontSize="large" sx={{ mr: 1, color: '#005FFF' }} />
              <Typography component="p" variant="body2">
                保険相談者のプロフィール情報の性別・年代・家族構成に即した回答をすると相談者からお問い合わせが増加する可能性があります。
              </Typography>
            </Box>
            <Divider sx={{ mb: 4 }} />
            <Box sx={{ mb: 4 }}>
              <Typography component="p" variant="body2">
                利用規約・プライバシーの考え方・ 保険相談ガイドラインをお読みのうえ、「同意して確認画面へ進む」ボタンを押してください。
              </Typography>
            </Box>
            <Box
              sx={{
                mb: 4,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <LoadingButton
                type="submit"
                loading={isLoading} // Click時にユーザー入力を停止する
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
                <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                同意して確認画面に進む
              </LoadingButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CurrentAnswerEdit
