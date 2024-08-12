import { LoadingButton } from '@mui/lab'
import {
  AppBar,
  Box,
  Card,
  Container,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Breadcrumbs from '@/components/Breadcrumbs'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

type ArticleProps = {
  title: string
  content: string
  status: string
}

type ArticleFormData = {
  title: string
  content: string
}

const CurrentArticlesEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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
        title: '',
        content: '',
        status: 'draft',
      }
    }
    // 相談データが存在する場合、存在するデータをセットする
    return {
      title: data.title == null ? '' : data.title,
      content: data.content == null ? '' : data.content,
      status: data.status,
    }
  }, [data])

  // const { handleSubmit, control, reset, watch } = useForm<ArticleFormData>({ 修正前
  const { handleSubmit, control, reset } = useForm<ArticleFormData>({
    defaultValues: article,
  })

  // 空form表示後にフェッチしたデータを含むformを表示する不自然な画面遷移を回避するため
  // isFetched(false)の間は、<Loading>コンポーネントを画面表示する
  useEffect(() => {
    if (data) {
      reset(article)
      setIsFetched(true) // データフェッチ終了後、trueに更新する
    }
  }, [data, article, reset])

  // form入力データの事前チェックをする
  const onSubmit: SubmitHandler<ArticleFormData> = (formData) => {
    if (formData.title == '') {
      return setSnackbar({
        message: '記事の保存にはタイトルが必要です',
        severity: 'error',
        pathname: '/current/articles/edit/[id]',
      })
    }

    if (formData.content == '') {
      return setSnackbar({
        message: '本文なしの記事は公開はできません',
        severity: 'error',
        pathname: '/current/articles/edit/[id]',
      })
    }

    setIsLoading(true)

    // form入力データを送信するため、PATCHリクエストのURLを生成する
    const patchUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles/' + id

    // APIリクエストのheaderを定義する
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    // form入力データをPATCHリクエスト用変数にセットする
    // form入力データを公開するためstatusを更新する
    const patchData = { ...formData, status: 'published' }

    axios({
      method: 'PATCH',
      url: patchUrl,
      data: patchData,
      headers: headers,
    })
      .then(() => {
        setSnackbar({
          message: '記事を保存しました',
          severity: 'success',
          pathname: '/current/articles/edit/[id]',
        })
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: '記事の保存に失敗しました',
          severity: 'error',
          pathname: '/current/articles/edit/[id]',
        })
      })
    setIsLoading(false)
  }

  if (error) return <Error />
  if (!data || !isFetched) return <Loading />

  return (
    <Box
      component="form"
      css={styles.pageMinHeight}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        <Box sx={{ p: 2 }}>
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            保険相談を入力する
          </Typography>
        </Box>
        <Box
          sx={{
            pt: 11,
            pb: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mb: 2 }}>
            {/* 相談タイトル入力フィールド */}
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="text"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  placeholder="相談タイトルを入力"
                  fullWidth
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
          </Box>
          <Box>
            <Controller
              name="content"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="textarea"
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                  multiline
                  fullWidth
                  placeholder="Write in Markdown Text"
                  rows={25}
                  sx={{ backgroundColor: 'white' }}
                />
              )}
            />
          </Box>
          <Box>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}
              sx={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: { xs: 12, sm: 16 },
              }}
            >
              更新する
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CurrentArticlesEdit
