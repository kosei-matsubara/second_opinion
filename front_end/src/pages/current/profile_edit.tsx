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
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { prefecturesOptions } from '@/components/PrefecturesOptions'
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

type ProfileFormData = ProfileProps

const CurrentProfileEdit: NextPage = () => {
  useRequireSignedIn()
  const [user] = useUserState()
  const [, setSnackbar] = useSnackbarState()
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userDivision, setUserDivision] = useState<string>('')

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
      // 初回表示画面制御のためuser_divisionの現在値を取得する
      setUserDivision(data.user_division)
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

  // `user_division` の値が変更された際に呼ばれるハンドラー
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
                  name="user_division"
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
                <div>
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
                      name="family_structure"
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
                          {Object.entries(prefecturesOptions).map(([key, label]) => (
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
                      mb: 2,
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <InfoIcon fontSize="large" sx={{ mr: 1, color: '#005FFF' }} />
                    <Typography component="p" variant="body2">
                      属性をご入力いただく事で保険のプロからより正確な保険相談に対する回答が得やすくなります。
                    </Typography>
                  </Box>
                </div>
              )}
              {/* 保険営業者向けの表示 */}
              {userDivision === 'insurance_agent' && (
                <div>
                  <Box
                    sx={{
                      backgroundColor: 'custom.h2backgroundColor',
                      borderRadius: 1,
                      my: 4,
                      p: 1,
                    }}
                  >
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
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
                      <Typography component="p" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
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
                      <Typography component="p" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
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
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                      自己紹介
                    </Typography>
                  </Box>
                  <Box>
                    {/* 自己紹介の入力field */}
                    <Controller
                      name="self_introduction"
                      control={control}
                      rules={validationRules.self_introduction}
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
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
                      わたしの強み
                    </Typography>
                  </Box>
                  <Box>
                    {/* わたしの強みの入力field */}
                    <Controller
                      name="my_strength"
                      control={control}
                      rules={validationRules.my_strength}
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
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
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
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
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
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
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
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
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
                    <Typography component="h2" variant="h6" sx={{ color: 'custom.h2color' }}>
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
                      name="inquiry_opening_time"
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
                      name="inquiry_telephone_number"
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
                      backgroundColor: '#EEFFFF	',
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
                </div>
              )}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2, py: 2 }}>
                <Typography component="p" variant="body2">
                  利用規約・プライバシーの考え方・ 保険相談ガイドラインをお読みのうえ、「同意してプロフィールを変更」ボタンを押してください。
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
