import HomeIcon from '@mui/icons-material/Home'
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

// パス名と日本語の対応表
const pathToJapanese: { [key: string]: string } = {
  'home': 'ホーム',
  'articlelist': 'みんなの保険相談一覧',
  'edit': '保険相談',
  'sign_out': 'サインアウト',
  'sign_up': '会員情報入力',
  'sign_up_provisional_registration': '仮登録完了',
  'sign_up_full_registration': '本登録完了',
  'sign_in': 'サインイン',
  // パス名を追加する場合に日本語パス名を追加する
}

// パス名を日本語に変換する関数
const translatePathname = (pathname: string): string => {
  return pathToJapanese[pathname] || pathname
}

// パンくずリストに含めないパス名リスト
const negativeList: string[] = [
  'current',
  'articles',
  'edit',
  '[id]',
  'edit_completion',
  // 生成URLから除外する階層パスを追加する
]

const Breadcrumbs: React.FC = () => {
  const router = useRouter()
  // 現在のパスを取得し、スラッシュで分割して配列にする
  const pathnames: string[] = router.pathname.split('/').filter((x) => x)

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {/* ホーム要素をリンクとして表示する */}
      <Box
        sx={{
          my: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
        <Link href="/" color="inherit" underline="hover">
          <Typography sx={{ fontSize: 18, color: '#000000' }}>
            {translatePathname('home')}
          </Typography>
        </Link>
      </Box>

      {pathnames
        // パンくずリストに含めないパスをフィルタリングする
        .filter((value) => !negativeList.includes(value))
        .map((value, index) => {
          // ホーム要素以降（2階層以降）の絶対パスを生成する
          const href = `/${pathnames.slice(0, index + 1).join('/')}`
          // 最終要素を判定する
          const isLast = index === pathnames.length - 1

          return isLast ? (
            // 最終要素の場合はテキストとして表示する
            <Box key={href} sx={{ my: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: 16, color: '#000000' }}>
                {translatePathname(value)}
              </Typography>
            </Box>
          ) : (
            // 最終要素・ホーム要素以外をリンクとして表示する
            <Box key={href} sx={{ my: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: 16, color: '#000000' }}>
                <Link href={href} color="inherit" underline="hover">
                  {translatePathname(value)}
                </Link>
              </Typography>
            </Box>
          )
        })}
    </MUIBreadcrumbs>
  )
}

export default Breadcrumbs
