import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const CurrentUserFetch = () => {
  const [user, setUser] = useUserState()

  useEffect(() => {
    // データフェッチ済の場合は当該処理を終了する
    if (user.isFetched) {
      return
    }

    // localStorageに認証情報の有無を判断する
    if (localStorage.getItem('access-token')) {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/user'
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((res: AxiosResponse) => {
          setUser({
            ...user,
            ...res.data,
            isSignedIn: true,
            isFetched: true,
          })
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message)
          setUser({
            ...user,
            isFetched: true,
          })
        })
    } else {
      // トークンが存在しない場合に以下処理を実行する
      setUser({
        ...user,
        isFetched: true,
      })
    }
  }, [user, setUser])

  return <div></div> // フェッチ完了時は何も表示しない
}

export default CurrentUserFetch
