import WarningIcon from '@mui/icons-material/Warning';
import { LoadingButton } from '@mui/lab'
import {
  AppBar,
  Box,
  Card,
  Container,
  TextField,
  Typography,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Breadcrumbs from '@/components/Breadcrumbs'
import { categoryOptions } from '@/components/CategoryOptions'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'
import { fetcher } from '@/utils'
import { Warning } from '@mui/icons-material';


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
    // 相談データが存在する場合、存在するデータをセットする
    return {
      categories: data.categories == null ? '' : data.categories,
      title: data.title == null ? '' : data.title,
      background: data.background == null ? '' : data.background,
      content: data.content == null ? '' : data.content,
      status: data.status,
    }
  }, [data])

  // const { handleSubmit, control, reset, watch } = useForm<ArticleFormData>({ 修正前
  // useFormフックを呼び出しformの状態と動作を管理する
  // handleSubmit: form送信時に呼び出す関数
  // control: form・fieldを管理するオブジェクト
  // reset: formの状態を初期化またはリセットする関数
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

  // fieldのvalidationを定義する
  const validationRules = {
    categories: {
      required: 'カテゴリは必須入力です',
    },
    title: {
      required: '相談タイトルは必須入力です',
      maxLength: {
        value: 50,
        message: '相談タイトルは50文字以内で入力してください',
      },
    },
    background: {
      required: '相談の背景は必須入力です',
      maxLength: {
        value: 600,
        message: '相談の背景は600文字以内で入力してください',
      },
    },
    content: {
      required: '質問は必須入力です',
      maxLength: {
        value: 100,
        message: '質問は100文字以内で入力してください',
      },
    },
  }

  // form入力データの未入力チェックをする
  const onSubmit: SubmitHandler<ArticleFormData> = (formData) => {
    if (formData.categories == '') {
      return setSnackbar({
        message: 'カテゴリが未入力です',
        severity: 'error',
        pathname: '/current/articles/edit/[id]',
      })
    }

    if (formData.title == '') {
      return setSnackbar({
        message: '相談タイトルが未入力です',
        severity: 'error',
        pathname: '/current/articles/edit/[id]',
      })
    }

    if (formData.background == '') {
      return setSnackbar({
        message: '相談の背景が未入力です',
        severity: 'error',
        pathname: '/current/articles/edit/[id]',
      })
    }

    if (formData.content == '') {
      return setSnackbar({
        message: '質問が未入力です',
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
        // 後ほど相談投稿完了の専用画面に遷移させる 課題
        setSnackbar({
          message: '相談を投稿しました',
          severity: 'success',
          pathname: '/current/articles/edit/[id]',
        })
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: '相談の投稿に失敗しました',
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
        <Box sx={{ my: 2 }}>
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
          <WarningIcon fontSize="large" sx={{ mx: 1, color: '#FF9900' }} />
          <Typography component="p" variant="body1">
            相談内容はどなたでもご覧になれますので、個人を特定されることのないよう入力内容は十分ご注意ください。また、投稿後の修正・削除はできませんのでご注意ください。
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
          <Box sx={{ mb: 8 }}>
            {/* カテゴリ入力field */}
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
                  placeholder="カテゴリを入力"
                >
                  {/* 外部ファイルからimportしたカテゴリオプションを表示する */}
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
          <Box sx={{ mb: 8 }}>
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
                  helperText={fieldState.error?.message}
                  fullWidth
                  placeholder="相談タイトルを入力"
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 8 }}>
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
                  helperText={fieldState.error?.message}
                  multiline
                  rows={10}
                  fullWidth
                  placeholder="相談の背景を入力"
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 8 }}>
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
                  helperText={fieldState.error?.message}
                  multiline
                  rows={2}
                  fullWidth
                  placeholder="質問を入力"
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
              投稿する
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default CurrentArticlesEdit
