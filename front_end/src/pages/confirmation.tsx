import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSnackbarState } from '@/hooks/useGlobalState'

const Confirmation: NextPage = () => {
  const router = useRouter()
  const [, setSnackbar] = useSnackbarState()

  useEffect(() => {
    // ルーターが準備中の場合は処理を実行しない
    if (!router.isReady) {
      return
    }

    if (router.query['confirmation_token']) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/user/confirmations'

      axios({ method: 'PATCH', url: url, data: router.query })
        .then(() => {
          setSnackbar({
            message: '認証に成功しました',
            severity: 'success',
            pathname: '/sign_in',
          })
          router.push('/sign_in')
        })
        .catch((e: AxiosError<{ error: string }>) => {
          console.log(e.message)
          setSnackbar({
            message: '不正なアクセスです',
            severity: 'error',
            pathname: '/',
          })
          router.push('/')
        })
    } else {
      setSnackbar({
        message: '不正なアクセスです',
        severity: 'error',
        pathname: '/',
      })
      router.push('/') // エラー時のリダイレクト
    }
  }, [router, setSnackbar])

  return <div></div> // UIをレンダリングしない場合はnullを返す
}

export default Confirmation
