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
import Breadcrumbs from '@/components/Breadcrumbs'
import { categoryOptions } from '@/components/CategoryOptions'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { validationRules } from '@/components/ValidationRules'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type ArticleProps = {
  categories: string
  title: string
  background: string
  content: string
  status: string
}

type ArticleFormData = {
  categories: string
  title: string
  background: string
  content: string
}

const CurrentArticlesEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [previewChecked, setPreviewChecked] = useState<boolean>(false)
  const steps = ['相談内容入力', '相談内容確認', '相談投稿完了'] // StepperのStepを定義する
  const [activeStep, setActiveStep] = useState<number>(1) // Stepperの初期値を定義する

  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles/'
  const { id } = router.query
  const { data, error } = useSWR(
    // 相談form表示のためURLを生成する
    user.isSignedIn && id ? url + id : null,
    fetcher,
  )

  const article: ArticleProps = useMemo(() => {
    // 相談データが存在しない場合、nullのデータを生成する
    if (!data) {
      return {
        categories: '',
        title: '',
        background: '',
        content: '',
        status: 'draft',
      }
    }
    // 相談データが存在する場合、存在するデータを定義する
    return {
      categories: data.categories == null ? '' : data.categories,
      title: data.title == null ? '' : data.title,
      background: data.background == null ? '' : data.background,
      content: data.content == null ? '' : data.content,
      status: data.status,
    }
  }, [data])

  // useFormフックを呼び出しユーザー操作に応じてformの状態と動作を管理する
  const { handleSubmit, control, reset, trigger, watch } = useForm<ArticleFormData>({
    defaultValues: article,
  })

  // 文字数カウントのためStateを定義する
  const [titleLength, setTitleLength] = useState<number>(0)
  const [backgroundLength, setBackgroundLength] = useState<number>(0)
  const [contentLength, setContentLength] = useState<number>(0)

  // 空form表示後にフェッチしたデータを含むformを表示する不自然な画面遷移を回避するため
  // isFetched(false)の間は、<Loading>コンポーネントを画面表示する
  useEffect(() => {
    if (data) {
      reset(article)
      //  入力中の文字が存在する場合は入力文字数をカウントする
      setTitleLength(article.title.length)
      setBackgroundLength(article.background.length)
      setContentLength(article.content.length)
      setIsFetched(true) // データフェッチ終了後、trueに更新する
    }
  }, [data, article, reset])

  // バリデーションチェック後にpreview表示に切り替える関数
  const handleClickButtonValidation = async () => {
    const isValid = await trigger() // バリデーションを実行後にboolean値を返す
    isValid ? setPreviewChecked(!previewChecked) : null
  }

  // preview表示を切り替える関数
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

  const onSubmit: SubmitHandler<ArticleFormData> = (formData) => {
    setIsLoading(true) // PATCHリクエスト送信のためユーザーアクションを不可に制御する

    // form入力データを送信するため、PATCHリクエストのURLを生成する
    const patchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles/' + id

    // APIリクエストのheaderを定義する
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    // form入力データをPATCHリクエスト用変数に定義する
    // form入力データを公開するためstatusを更新する
    const patchData = { ...formData, status: 'published' }

    axios({
      method: 'PATCH',
      url: patchUrl,
      data: patchData,
      headers: headers,
    })
      .then(() => {
        // 相談投稿完了画面に遷移する
        router.push({
          pathname: '/current/articles/edit_completion',
          query: { id, step: activeStep + 1 },
        })
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: '相談の投稿が失敗しました',
          severity: 'error',
          pathname: '/current/articles/edit/[id]',
        })
      })
      .finally(() => {
        setIsLoading(false) // PATCHリクエスト完了後にユーザーアクションを可能に制御する
      })
  }

  if (error) return <Error />
  if (!data || !isFetched) return <Loading />

  return (
    <Box>
      <Head>
        <title>保険相談</title>
      </Head>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#FFFFFF',
            boxShadow: 'none',
            color: '#000000',
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ mx: 1, my: 2 }}>
              <Link href="/">
                <Typography component="p" variant="h5">
                  保険のセカンドオピニオン
                </Typography>
              </Link>
            </Box>
          </Container>
        </AppBar>
        <Container maxWidth="md">
          <Breadcrumbs />
          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/* 入力画面を表示する */}
          {!previewChecked && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                  保険相談を入力する
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#FFFFCC',
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <WarningIcon fontSize="large" sx={{ mr: 1, color: '#FF9900' }} />
                <Typography component="p" variant="body2">
                  相談内容はどなたでもご覧になれます。個人を特定される可能性がある内容の入力はお控えください。また、投稿後の修正・削除はできませんのでご注意ください。
                </Typography>
              </Box>
              <Box
                sx={{
                  my: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0px 10px',
                  }}
                >
                  <Typography component="p" variant="h6">
                    相談カテゴリ
                  </Typography>
                  <Typography component="p" variant="body1" sx={{ color: '#FF0000' }}>
                    必須
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  {/* 相談カテゴリ入力field */}
                  <Controller
                    name="categories"
                    control={control}
                    rules={validationRules.categories}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        select
                        value={field.value}
                        error={fieldState.invalid}
                        helperText={fieldState.error?.message}
                        fullWidth
                        placeholder="相談カテゴリを入力"
                      >
                        {/* 外部ファイルからimportしたカテゴリオプションをプルダウンメニューに表示する */}
                        {Object.entries(categoryOptions).map(([key, label]) => (
                          <MenuItem key={key} value={key}>
                            {label}
                          </MenuItem>
                        ))}
                      </TextField>
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
                    相談カテゴリには、あなたの「詳しく知りたい商品」や「気になる保障内容」を選択する
                    <br />
                    相談カテゴリの選択に悩む場合は、「あなたの悩み」に近いと感じる相談カテゴリを選択する
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
                    相談タイトル
                  </Typography>
                  <Typography component="p" variant="body1" sx={{ color: '#FF0000' }}>
                    必須
                  </Typography>
                  <Typography component="p" variant="body1">
                    （50文字以内）
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  {/* 相談タイトル入力field */}
                  <Controller
                    name="title"
                    control={control}
                    rules={validationRules.title}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        error={fieldState.invalid}
                        // validationエラーを出力していない場合は入力文字数を表示する
                        helperText={`${fieldState.error?.message || ''} ${titleLength}/50文字`}
                        onChange={(e) => {
                          field.onChange(e)
                          // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                          setTitleLength(e.target.value.length)
                        }}
                        fullWidth
                        placeholder="相談タイトルを入力"
                      />
                    )}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0px 10px',
                  }}
                >
                  <Typography component="p" variant="h6">
                    相談の背景（前提条件）
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
                    name="background"
                    control={control}
                    rules={validationRules.background}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        type="text"
                        error={fieldState.invalid}
                        // validationエラーを出力していない場合は入力文字数を表示する
                        helperText={`${fieldState.error?.message || ''} ${backgroundLength}/600文字`}
                        onChange={(e) => {
                          field.onChange(e)
                          // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                          setBackgroundLength(e.target.value.length)
                        }}
                        multiline
                        rows={10}
                        fullWidth
                        placeholder="相談の背景を入力"
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
                    相談の背景（前提条件）には「自分の健康状態」や「家族構成」などリスクの程度を書く
                    <br />
                    例:20代社会人になり子供はいませんので今のところ大きなリスクに備える必要はないと感じています。
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
                    質問
                  </Typography>
                  <Typography component="p" variant="body1" sx={{ color: '#FF0000' }}>
                    必須
                  </Typography>
                  <Typography component="p" variant="body1">
                    （100文字以内）
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  {/* 質問入力field */}
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
                        helperText={`${fieldState.error?.message || ''} ${contentLength}/100文字`}
                        onChange={(e) => {
                          field.onChange(e)
                          // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                          setContentLength(e.target.value.length)
                        }}
                        multiline
                        rows={2}
                        fullWidth
                        placeholder="質問を入力"
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
                    質問には、あなたの「聞きたいこと」や「希望」を書く
                    <br />
                    例:死亡保険に入る必要はありますか。また入る場合にどのような判断基準で支払われる保険金額を設定すればいいでしょうか。
                  </Typography>
                </Box>
                <Box sx={{ borderTop: '0.5px solid #000000', mb: 2, py: 2 }}>
                  <Typography component="p" variant="body2">
                    利用規約・プライバシーの考え方・ 保険相談ガイドラインをお読みのうえ、「同意して確認画面へ進む」ボタンを押してください。
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                    onClick={async () => {
                      await handleClickButtonValidation() // Validationが正常実行後に画面遷移させるためawaitで処理を制御する
                      handleNextStep()
                    }}
                  >
                    <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                    同意して確認画面に進む
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
          {/* 入力確認画面を表示する */}
          {previewChecked && (
            <Box>
              <Box sx={{ my: 2 }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                  保険相談を確認する
                </Typography>
              </Box>
              <Box
                sx={{
                  mt: 6,
                  pb: 16,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box>
                  <Typography component="p" variant="h6">
                    【相談カテゴリ】
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography component="p" variant="body1">
                    {watch('categories')}
                  </Typography>
                </Box>
                <Box>
                  <Typography component="p" variant="h6">
                    【相談タイトル】
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography component="p" variant="body1">
                    {watch('title')}
                  </Typography>
                </Box>
                <Box>
                  <Typography component="p" variant="h6">
                    【相談の背景】
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography component="p" variant="body1">
                    {watch('background')}
                  </Typography>
                </Box>
                <Box>
                  <Typography component="p" variant="h6">
                    【質問】
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <Typography component="p" variant="body1">
                    {watch('content')}
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
                    ・<strong>投稿後の修正や削除はできません</strong>のでご注意ください。
                    <br />
                    ・入力内容に間違いがないことをお確かめのうえ「投稿する」ボタンを押してください。
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="text"
                    sx={{
                      width: 150,
                      boxShadow: 'none',
                      border: '0.5px solid #000000',
                      borderRadius: 1,
                      textTransform: 'none',
                      fontSize: { xs: 12, sm: 16 },
                      fontWeight: 'bold',
                      color: '#000000',
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                    onClick={async () => {
                      await handleBackStep() // Stepのカウントダウン後に画面遷移させるためawaitで処理を制御する
                      handleClickButtonPreview()
                    }}
                  >
                    <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
                    修正する
                  </Button>
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
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      mt: 8,
                    }}
                  >
                    投稿する
                    <SendIcon fontSize="small" sx={{ ml: 1 }} />
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default CurrentArticlesEdit
