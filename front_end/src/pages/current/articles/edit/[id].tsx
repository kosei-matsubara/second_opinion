import InfoIcon from '@mui/icons-material/Info'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import { LoadingButton } from '@mui/lab'
import {
  AppBar,
  Box,
  Container,
  TextField,
  Typography,
  Button,
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

  // useFormフックを呼び出しformの状態と動作を管理する
  // handleSubmit: form送信時に呼び出す関数
  // control: form・fieldを管理するオブジェクト
  // reset: formの状態を初期化またはリセットする関数
  // watch: form・view情報を管理する関数
  const { handleSubmit, control, reset, watch } = useForm<ArticleFormData>({
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
      setIsFetched(true) // データフェッチ終了後、trueに更新する
      //  入力中の文字が存在する場合は入力文字数をセットする
      setTitleLength(article.title.length)
      setBackgroundLength(article.background.length)
      setContentLength(article.content.length)
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

  // preview表示を切り替える関数
  const handleClickButtonPreview = () => {
    setPreviewChecked(!previewChecked)
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
        {/* 入力画面を表示する */}
        {!previewChecked && (
          <Box>
            <Box sx={{ my: 2 }}>
              <Typography
                component="h1"
                variant="h4"
                sx={{ fontWeight: 'bold' }}
              >
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
                相談内容はどなたでもご覧になれます。個人を特定される可能性がある内容の入力はお控えください。また、投稿後の修正・削除はできませんのでご注意ください。
              </Typography>
            </Box>
            <Box
              sx={{
                my: 6,
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
              <Box sx={{ mb: 6 }}>
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
                  相談の背景
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
                <InfoIcon fontSize="large" sx={{ mx: 1, color: '#005FFF' }} />
                <Typography component="p" variant="body2">
                  相談の背景には自分の健康状態や家族構成などリスクの程度を書く
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
                <InfoIcon fontSize="large" sx={{ mx: 1, color: '#005FFF' }} />
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
                    display: 'flex',          // 子要素をフレックスボックスでレイアウト
                    justifyContent: 'center', // 水平方向の中央揃え
                    alignItems: 'center',

                  }}
                  onClick={handleClickButtonPreview}
                >
                  <CheckCircleIcon fontSize="small" sx={{ mx: 1 }} />
                  同意して確認画面に進む
                </Button>
              </Box>
            </Box>
          </Box>
        )}
        {/* 入力確認画面を表示する */}
        {previewChecked && (
          <Box>
            {watch('title')}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="contained"
                onClick={handleClickButtonPreview} // プレビュー表示切り替え関数を紐付け
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: 12, sm: 16 },
                  backgroundColor: previewChecked ? 'green' : 'blue',
                }}
              >
                修正する
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={isLoading}
                sx={{
                  width: 250,
                  boxShadow: 'none',
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: { xs: 12, sm: 16 },
                  fontWeight: 'bold',
                }}
              >
                投稿する
              </LoadingButton>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default CurrentArticlesEdit
