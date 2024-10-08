import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  TextField,
  Button,
  Typography,
  Divider,
} from '@mui/material'
import axios, { AxiosError } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import snakecaseKeys from 'snakecase-keys'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { prefecturesOptions } from '@/components/PrefecturesOptions'
import { validationRules } from '@/components/ValidationRules'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

type ProfileProps = {
  userDivision: string
  name: string
  sex: string
  generation: string
  familyStructure: string
  prefectures: string
  belong: string
  address: string
  selfIntroduction: string
  myStrength: string
  career: string
  message: string
  access: string
  website: string
  inquiryOpeningTime: string
  inquiryTelephoneNumber: string
}

type ProfileFormData = ProfileProps

const CurrentProfileEdit: NextPage = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const [userDivision, setUserDivision] = useState<string>('')
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setSnackbar] = useSnackbarState()

  // APIからプロフィールデータを取得する
  const { data, error } = useSWR(
    user.isSignedIn ? process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user' : null,
    fetcher,
  )

  const camelCaseProfileData = useMemo(() => {
    return data ? camelcaseKeys(data) : null
  }, [data])

  const Profile: ProfileProps = useMemo(() => {
    // プロフィールデータが存在しない場合、nullのデータを生成する
    if (!camelCaseProfileData) {
      return {
        userDivision: '',
        name: '',
        sex: '',
        generation: '',
        familyStructure: '',
        prefectures: '',
        belong: '',
        address: '',
        selfIntroduction: '',
        myStrength: '',
        career: '',
        message: '',
        access: '',
        website: '',
        inquiryOpeningTime: '',
        inquiryTelephoneNumber: '',
      }
    }
    // プロフィールデータが存在する場合、存在するデータを定義する
    return {
      userDivision: camelCaseProfileData.userDivision == null ? '' : camelCaseProfileData.userDivision,
      name: camelCaseProfileData.name == null ? '' : camelCaseProfileData.name,
      sex: camelCaseProfileData.sex == null ? '' : camelCaseProfileData.sex,
      generation: camelCaseProfileData.generation == null ? '' : camelCaseProfileData.generation,
      familyStructure: camelCaseProfileData.familyStructure == null ? '' : camelCaseProfileData.familyStructure,
      prefectures: camelCaseProfileData.prefectures == null ? '' : camelCaseProfileData.prefectures,
      belong: camelCaseProfileData.belong == null ? '' : camelCaseProfileData.belong,
      address: camelCaseProfileData.address == null ? '' : camelCaseProfileData.address,
      selfIntroduction: camelCaseProfileData.selfIntroduction == null ? '' : camelCaseProfileData.selfIntroduction,
      myStrength: camelCaseProfileData.myStrength == null ? '' : camelCaseProfileData.myStrength,
      career: camelCaseProfileData.career == null ? '' : camelCaseProfileData.career,
      message: camelCaseProfileData.message == null ? '' : camelCaseProfileData.message,
      access: camelCaseProfileData.access == null ? '' : camelCaseProfileData.access,
      website: camelCaseProfileData.website == null ? '' : camelCaseProfileData.website,
      inquiryOpeningTime: camelCaseProfileData.inquiryOpeningTime == null ? '' : camelCaseProfileData.inquiryOpeningTime,
      inquiryTelephoneNumber: camelCaseProfileData.inquiryTelephoneNumber == null ? '' : camelCaseProfileData.inquiryTelephoneNumber,
    }
  }, [camelCaseProfileData])

  // useFormフックを呼び出しユーザー操作に応じてformの状態と動作を管理する
  const { handleSubmit, control, reset } = useForm<ProfileFormData>({
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
      // 初回表示画面制御のためuserDivisionの現在値を取得する
      setUserDivision(Profile.userDivision)
      //  入力文字が存在する場合は入力文字数をカウントする
      setSelfIntroductionLength(Profile.selfIntroduction.length)
      setMyStrengthLength(Profile.myStrength.length)
      setCareerLength(Profile.career.length)
      setMessageLength(Profile.message.length)
      setAccessLength(Profile.access.length)
      setWebsiteLength(Profile.website.length)
      setIsFetched(true) // データフェッチ終了後、trueに更新する
    }
  }, [data, Profile, reset])

  if (error) return <Error />
  if (!data || !isFetched) return <Loading />

  // userDivisionの変更時に再レンダリングする
  const handleUserDivisionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserDivision(event.target.value)
  }
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
    const patchData = snakecaseKeys(formData)

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
          pathname: '/current/profile_edit',
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

  return (
    <Box>
      <Head>
        <title>プロフィール情報の変更</title>
      </Head>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="md">
          <Box>
            <Box sx={{ mt: 4, mb: 2 }}>
              <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
                プロフィール情報を変更する
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '0px 80px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0px 20px',
                }}
              >
                <Typography component="p" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                  名前
                </Typography>
                <Typography component="p" variant="body1" sx={{ color: '#FF0000' }}>
                  必須
                </Typography>
              </Box>
              <Box>
                {/* 名前入力field */}
                <Controller
                  name="name"
                  control={control}
                  rules={validationRules.name}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="text"
                      error={fieldState.invalid}
                      helperText={fieldState.error?.message}
                      InputProps={{
                        sx: {
                          height: '40px',
                        },
                      }}
                      placeholder="名前を入力"
                    />
                  )}
                />
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <FormControl component="fieldset" fullWidth>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormLabel
                  component="legend"
                  sx={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    '&.MuiFormLabel-root': {
                      color: '#000000',
                    },
                  }}
                >
                  利用者区分
                </FormLabel>
                <Controller
                  name="userDivision"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      value={field.value} // react-hook-formのfield.valueを定義する
                      onChange={(event) => {
                        field.onChange(event) // form入力値をPATCHリクエストに使用するためreact-hook-formのonChangeを実行する
                        handleUserDivisionChange(event) // 表示画面を切り替える関数を実行する
                      }}
                      row
                      sx={{
                        position: 'absolute',
                        left: '20%',
                      }}
                    >
                      <FormControlLabel value="" control={<Radio />} label="選択しない" />
                      <FormControlLabel value="policyholder" control={<Radio />} label="保険契約者" />
                      <FormControlLabel value="insurance_agent" control={<Radio />} label="保険営業者" />
                    </RadioGroup>
                  )}
                />
              </Box>
              {/* 保険契約者向けの表示 */}
              {userDivision === 'policyholder' && (
                <Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        '&.MuiFormLabel-root': {
                          color: '#000000',
                        },
                      }}
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
                            left: '20%',
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        color: '#000000',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        '&.MuiFormLabel-root': {
                          color: '#000000',
                        },
                      }}
                    >
                      年代
                    </FormLabel>
                    <Controller
                      name="generation"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          row
                          sx={{
                            position: 'absolute',
                            left: '20%',
                          }}
                        >
                          <FormControlLabel value="" control={<Radio />} label="選択しない" />
                          <FormControlLabel value="teens" control={<Radio />} label="10代" />
                          <FormControlLabel value="twenties" control={<Radio />} label="20代" />
                          <FormControlLabel value="thirties" control={<Radio />} label="30代" />
                          <FormControlLabel value="forties" control={<Radio />} label="40代" />
                          <FormControlLabel value="fifties" control={<Radio />} label="50代" />
                          <FormControlLabel value="sixties_and_above" control={<Radio />} label="60代以降" />
                        </RadioGroup>
                      )}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        color: '#000000',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        '&.MuiFormLabel-root': {
                          color: '#000000',
                        },
                      }}
                    >
                      家族構成
                    </FormLabel>
                    <Controller
                      name="familyStructure"
                      control={control}
                      render={({ field }) => (
                        <RadioGroup
                          {...field}
                          row
                          sx={{
                            position: 'absolute',
                            left: '20%',
                          }}
                        >
                          <FormControlLabel value="" control={<Radio />} label="選択しない" />
                          <FormControlLabel value="single" control={<Radio />} label="独身" />
                          <FormControlLabel value="couple" control={<Radio />} label="夫婦" />
                          <FormControlLabel value="couple_with_children" control={<Radio />} label="夫婦＋子供" />
                        </RadioGroup>
                      )}
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                    <FormLabel
                      component="legend"
                      sx={{
                        color: '#000000',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        '&.MuiFormLabel-root': {
                          color: '#000000',
                        },
                      }}
                    >
                      都道府県
                    </FormLabel>
                    <Controller
                      name="prefectures"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          value={field.value}
                          sx={{
                            position: 'absolute',
                            left: '20%',
                            width: '130px',
                          }}
                          InputProps={{
                            sx: {
                              height: '40px',
                            },
                          }}
                          SelectProps={{
                            MenuProps: {
                              PaperProps: {
                                sx: {
                                  maxHeight: '400px',
                                },
                              },
                            },
                          }}
                        >
                          {/* 外部ファイルからimportしたオプションをプルダウンメニューに表示する */}
                          {Object.entries(prefecturesOptions).map(
                            ([key, label]: [string, string]) => (
                              <MenuItem key={key} value={key}>
                                {label}
                              </MenuItem>
                            ),
                          )}
                        </TextField>
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: '#EEFFFF',
                      mb: 2,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <InfoIcon fontSize="large" sx={{ mr: 1, color: '#005FFF' }} />
                    <Typography component="p" variant="body2">
                      属性をご入力いただく事で保険のプロからより正確な保険相談の回答が得やすくなります。
                    </Typography>
                  </Box>
                </Box>
              )}
              {/* 保険営業者向けの表示 */}
              {userDivision === 'insurance_agent' && (
                <Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      人物紹介
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0px 20px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        component="p"
                        sx={{ fontSize: '20px', fontWeight: 'bold' }}
                      >
                        所属
                      </Typography>
                    </Box>
                    <Box>
                      {/* 所属入力field */}
                      <Controller
                        name="belong"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="text"
                            sx={{ width: '400px' }}
                            InputProps={{
                              sx: {
                                height: '40px',
                              },
                            }}
                            placeholder="所属を入力"
                          />
                        )}
                      />
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0px 20px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        component="p"
                        sx={{ fontSize: '20px', fontWeight: 'bold' }}
                      >
                        住所
                      </Typography>
                    </Box>
                    <Box>
                      {/* 住所入力field */}
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="text"
                            sx={{ width: '400px' }}
                            InputProps={{
                              sx: {
                                height: '40px',
                              },
                            }}
                            placeholder="住所を入力"
                          />
                        )}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      自己紹介
                    </Typography>
                  </Box>
                  <Box>
                    {/* 自己紹介の入力field */}
                    <Controller
                      name="selfIntroduction"
                      control={control}
                      rules={validationRules.selfIntroduction}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={fieldState.invalid}
                          // validationエラーを出力していない場合は入力文字数を表示する
                          helperText={`${fieldState.error?.message || ''} ${selfIntroductionLength}/600文字`}
                          onChange={(e) => {
                            field.onChange(e)
                            // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                            setSelfIntroductionLength(e.target.value.length)
                          }}
                          multiline
                          rows={10}
                          fullWidth
                          placeholder="自己紹介を入力"
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      わたしの強み
                    </Typography>
                  </Box>
                  <Box>
                    {/* わたしの強みの入力field */}
                    <Controller
                      name="myStrength"
                      control={control}
                      rules={validationRules.myStrength}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={fieldState.invalid}
                          // validationエラーを出力していない場合は入力文字数を表示する
                          helperText={`${fieldState.error?.message || ''} ${myStrengthLength}/600文字`}
                          onChange={(e) => {
                            field.onChange(e)
                            // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                            setMyStrengthLength(e.target.value.length)
                          }}
                          multiline
                          rows={10}
                          fullWidth
                          placeholder="わたしの強みを入力"
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      経歴
                    </Typography>
                  </Box>
                  <Box>
                    {/* 経歴の入力field */}
                    <Controller
                      name="career"
                      control={control}
                      rules={validationRules.career}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={fieldState.invalid}
                          // validationエラーを出力していない場合は入力文字数を表示する
                          helperText={`${fieldState.error?.message || ''} ${careerLength}/400文字`}
                          onChange={(e) => {
                            field.onChange(e)
                            // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                            setCareerLength(e.target.value.length)
                          }}
                          multiline
                          rows={7}
                          fullWidth
                          placeholder="経歴を入力"
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      相談者へのメッセージ
                    </Typography>
                  </Box>
                  <Box>
                    {/* 相談者へのメッセージの入力field */}
                    <Controller
                      name="message"
                      control={control}
                      rules={validationRules.message}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={fieldState.invalid}
                          // validationエラーを出力していない場合は入力文字数を表示する
                          helperText={`${fieldState.error?.message || ''} ${messageLength}/400文字`}
                          onChange={(e) => {
                            field.onChange(e)
                            // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                            setMessageLength(e.target.value.length)
                          }}
                          multiline
                          rows={7}
                          fullWidth
                          placeholder="相談者へのメッセージを入力"
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      アクセス
                    </Typography>
                  </Box>
                  <Box>
                    {/* アクセスの入力field */}
                    <Controller
                      name="access"
                      control={control}
                      rules={validationRules.access}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={fieldState.invalid}
                          // validationエラーを出力していない場合は入力文字数を表示する
                          helperText={`${fieldState.error?.message || ''} ${accessLength}/400文字`}
                          onChange={(e) => {
                            field.onChange(e)
                            // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                            setAccessLength(e.target.value.length)
                          }}
                          multiline
                          rows={7}
                          fullWidth
                          placeholder="アクセスを入力"
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      弊社ホームページ
                    </Typography>
                  </Box>
                  <Box>
                    {/* 弊社ホームページの入力field */}
                    <Controller
                      name="website"
                      control={control}
                      rules={validationRules.website}
                      render={({ field, fieldState }) => (
                        <TextField
                          {...field}
                          type="text"
                          error={fieldState.invalid}
                          // validationエラーを出力していない場合は入力文字数を表示する
                          helperText={`${fieldState.error?.message || ''} ${websiteLength}/80文字`}
                          onChange={(e) => {
                            field.onChange(e)
                            // field更新情報から入力文字データを保持しているtarget.valueを抽出して入力文字数をカウントする
                            setWebsiteLength(e.target.value.length)
                          }}
                          multiline
                          rows={2}
                          fullWidth
                          placeholder="弊社ホームページを入力"
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h6"
                      sx={{ color: 'custom.h2color' }}
                    >
                      お問い合わせ
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      mb: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0px 20px',
                    }}
                  >
                    {/* お問い合わせ・受付時間の入力field */}
                    <Typography component="p" sx={{ fontSize: '16px' }}>
                      受付時間
                    </Typography>
                    <Controller
                      name="inquiryOpeningTime"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          sx={{ backgroundColor: '#FFFFFF', width: '150px' }}
                          InputProps={{
                            sx: {
                              height: '40px',
                            },
                          }}
                          placeholder="受付時間を入力"
                        />
                      )}
                    />
                    {/* お問い合わせ・電話番号の入力field */}
                    <Typography component="p" sx={{ fontSize: '16px' }}>
                      電話番号
                    </Typography>
                    <Controller
                      name="inquiryTelephoneNumber"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="text"
                          sx={{ backgroundColor: '#FFFFFF', width: '150px' }}
                          InputProps={{
                            sx: {
                              height: '40px',
                            },
                          }}
                          placeholder="電話番号を入力"
                        />
                      )}
                    />
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: '#EEFFFF',
                      mb: 2,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <InfoIcon fontSize="large" sx={{ mr: 1, color: '#005FFF' }} />
                    <Typography component="p" variant="body2">
                      プロフィールを充実させる事で保険契約者からの保険相談件数が増加する可能性があります。
                    </Typography>
                  </Box>
                </Box>
              )}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 4 }}>
                <Typography component="p" variant="body2">
                  利用規約・プライバシーの考え方・保険相談ガイドラインをお読みのうえ、「同意してプロフィールを変更」ボタンを押してください。
                </Typography>
              </Box>
              <Box
                sx={{
                  mb: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '20px 0px',
                }}
              >
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
                <Link href="/">
                  <Button
                    variant="text"
                    sx={{
                      width: 280,
                      boxShadow: 'none',
                      border: '0.5px solid #000000',
                      borderRadius: 1,
                      color: '#000000',
                      textTransform: 'none',
                      fontSize: { xs: 12, sm: 16 },
                      fontWeight: 'bold',
                    }}
                  >
                    <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    トップページへ戻る
                  </Button>
                </Link>
              </Box>
            </FormControl>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default CurrentProfileEdit
