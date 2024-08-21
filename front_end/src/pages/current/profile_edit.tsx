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

type UserProps = {
  user_division: string
  name: string
  sex: string
  generation: string
  family_structure: string
  prefectures: string
  belong: string
  address: string
  self_introduction: string
  my_strength: string
  career: string
  message: string
  access: string
  website: string
  inquiry_opening_time: string
  inquiry_telephone_number: string
}

type UserFormData = {
  categories: string
  title: string
  background: string
  content: string
}

const CurrentProfileEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const article: ArticleProps = useMemo(() => {
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
        <title>プロフィール情報の変更</title>
      </Head>
    </Box>
  )
}

export default CurrentProfileEdit
