import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import SendIcon from '@mui/icons-material/Send'
import WarningIcon from '@mui/icons-material/Warning'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  TextField,
  Button,
  Typography,
  Divider,
} from '@mui/material'
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

type ProfileProps = {
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

type ProfileFormData = {
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

const CurrentProfileEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // APIからプロフィールデータを取得する
  const { data, error } = useSWR<ProfileProps>(
    user.isSignedIn ? process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user' : null,
    fetcher,
  )

  const Profile: ProfileProps = useMemo(() => {
    // プロフィールデータが存在しない場合、nullのデータを生成する
    if (!data) {
      return {
        user_division: '',
        name: '',
        sex: '',
        generation: '',
        family_structure: '',
        prefectures: '',
        belong: '',
        address: '',
        self_introduction: '',
        my_strength: '',
        career: '',
        message: '',
        access: '',
        website: '',
        inquiry_opening_time: '',
        inquiry_telephone_number: '',
      }
    }
    // プロフィールデータが存在する場合、存在するデータを定義する
    return {
      user_division: data.user_division == null ? '' : data.user_division,
      name: data.name == null ? '' : data.name,
      sex: data.sex == null ? '' : data.sex,
      generation: data.generation == null ? '' : data.generation,
      family_structure: data.family_structure == null ? '' : data.family_structure,
      prefectures: data.prefectures == null ? '' : data.prefectures,
      belong: data.belong == null ? '' : data.belong,
      address: data.address == null ? '' : data.address,
      self_introduction: data.self_introduction == null ? '' : data.self_introduction,
      my_strength: data.my_strength == null ? '' : data.my_strength,
      career: data.career == null ? '' : data.career,
      message: data.message == null ? '' : data.message,
      access: data.access == null ? '' : data.access,
      website: data.website == null ? '' : data.website,
      inquiry_opening_time: data.inquiry_opening_time == null ? '' : data.inquiry_opening_time,
      inquiry_telephone_number: data.inquiry_telephone_number == null ? '' : data.inquiry_telephone_number,
    }
  }, [data])

  // useFormフックを呼び出しユーザー操作に応じてformの状態と動作を管理する
  const { handleSubmit, control, reset, trigger, watch } = useForm<ProfileFormData>({
    defaultValues: Profile,
  })

  // 文字数カウントのためStateを定義する
  const [selfIntroductionLength, setSelfIntroductionLength] = useState<number>(0)
  const [myStrengthLength, setMyStrengthLength] = useState<number>(0)
  const [careerLength, setCareerLength] = useState<number>(0)
  const [messageLength, setMessageLength] = useState<number>(0)
  const [accessLength, setAccessLength] = useState<number>(0)
  const [websiteLength, setWebsiteLength] = useState<number>(0)

  // 空form表示後にフェッチしたデータを含むformを表示する不自然な画面遷移を回避するため
  // isFetched(false)の間は、<Loading>コンポーネントを画面表示する
  useEffect(() => {
    if (data) {
      reset(Profile)
      //  入力文字が存在する場合は入力文字数をカウントする
      setSelfIntroductionLength(Profile.self_introduction.length)
      setMyStrengthLength(Profile.my_strength.length)
      setCareerLength(Profile.career.length)
      setMessageLength(Profile.message.length)
      setAccessLength(Profile.access.length)
      setWebsiteLength(Profile.website.length)
      setIsFetched(true) // データフェッチ終了後、trueに更新する
    }
  }, [data, Profile, reset])

  const onSubmit: SubmitHandler<ProfileFormData> = (formData) => {
    setIsLoading(true) // PATCHリクエスト送信のためユーザーアクションを不可に制御する

    // form入力データを送信するため、PATCHリクエストのURLを生成する
    const patchUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user'

    // APIリクエストのheaderを定義する
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    // form入力データをPATCHリクエスト用変数に定義する
    const patchData = { ...formData }

    axios({
      method: 'PATCH',
      url: patchUrl,
      data: patchData,
      headers: headers,
    })
      .then(() => {
        setSnackbar({
          message: 'プロフィールを変更しました',
          severity: 'success',
          pathname: '/',
        })
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message)
        setSnackbar({
          message: 'プロフィールの変更が失敗しました',
          severity: 'error',
          pathname: '/current/profile_edit',
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Box>
            <Box sx={{ mb: 0 }}>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                プロフィール情報を変更する
              </Typography>
            </Box>
            <FormControl component="fieldset" fullWidth sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormLabel
                  component="legend"
                  sx={{ color: '#000000', fontSize: '20px', fontWeight: 'bold' }}
                >
                  利用者区分
                </FormLabel>
                <Controller
                  name="user_division"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      sx={{
                        position: 'absolute',
                        left: '30%',
                      }}
                    >
                      <FormControlLabel value="" control={<Radio />} label="選択しない" />
                      <FormControlLabel value="policyholder" control={<Radio />} label="保険契約者" />
                      <FormControlLabel value="insurance_agent" control={<Radio />} label="保険営業者" />
                    </RadioGroup>
                  )}
                />
              </Box>
              <Box
                sx={{
                  backgroundColor: '#EEFFFF	',
                  mb: 0,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <InfoIcon fontSize="large" sx={{ mr: 1, color: '#005FFF' }} />
                <Typography component="p" variant="body2">
                  属性をご入力いただく事で保険のプロからより回答な正確が得やすくなります。
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormLabel
                  component="legend"
                  sx={{ color: '#000000', fontSize: '20px', fontWeight: 'bold' }}
                >
                  性別
                </FormLabel>
                <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      row
                      sx={{
                        position: 'absolute',
                        left: '30%',
                      }}
                    >
                      <FormControlLabel value="" control={<Radio />} label="選択しない" />
                      <FormControlLabel value="male" control={<Radio />} label="男性" />
                      <FormControlLabel value="female" control={<Radio />} label="女性" />
                    </RadioGroup>
                  )}
                />
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 0, py: 0 }}>
                <Typography component="p" variant="body2">
                  利用規約・プライバシーの考え方・ 保険相談ガイドラインをお読みのうえ、「同意してプロフィールを変更」ボタンを押してください。
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LoadingButton
                  type="submit"
                  loading={isLoading} // Click時にユーザー入力を停止する
                  variant="contained"
                  sx={{
                    width: 280,
                    boxShadow: 'none',
                    borderRadius: 1,
                    textTransform: 'none',
                    fontSize: { xs: 12, sm: 16 },
                    fontWeight: 'bold',
                  }}
                >
                  <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                  同意してプロフィールを変更
                </LoadingButton>
              </Box>
            </FormControl>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CurrentProfileEdit
