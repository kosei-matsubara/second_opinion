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
      // PATCHリクエストのURLを生成する
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/user/confirmations'

      axios({
        method: 'PATCH',
        url: url,
        data: router.query,
      })
        .then(() => {
          // 本登録完了画面に遷移する
          router.push('/sign_up_full_registration')
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
      router.push('/')
    }
  }, [router, setSnackbar])

  return <div></div> // UIをレンダリングしない場合はnullを返す
}

export default Confirmation
