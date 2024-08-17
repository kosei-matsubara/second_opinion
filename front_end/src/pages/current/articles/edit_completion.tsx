# 目的
リファクタリングする

# 回答範囲
Next.js
Material-UI
を活用する具体的なコード例を教えてください。

# 前提条件
Next.js と Material-UI をプロジェクトにインストールは対応済み
Javascriptプログラムを生成する場合はTypeScriptを導入する
コード可読性が高い
コードがある程度重複しても処理内容を一箇所にまとめるコード構造にする
コードに補足コメントを追加
コードに補足コメントを追加する場合は体言止めにしない
ステップ末尾の;は不要
import from ディレクトリ定義 '@/components/'
コードを修正する場合は修正箇所を目立つように提示する

# 出力形式
コードを含む回答をお願いします。また、それぞれの言語ごとにコメントも追加してください。

# インプットスクリーンショット
添付ファイル

# インプットプログラム
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import HomeIcon from '@mui/icons-material/Home'
import MessageIcon from '@mui/icons-material/Message'
import WarningIcon from '@mui/icons-material/Warning'
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button,
} from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styles } from '@/styles'

const EditCompletion: NextPage = () => {
  const router = useRouter()
  const steps = ['相談内容入力', '相談内容確認', '相談投稿完了'] // StepperのStepを定義する
  const activeStep = parseInt(router.query.step as string, 10)
  const articleId = router.query.id

  return (
    <Box>
      <Head>
        <title>保険相談投稿完了</title>
      </Head>
      <Box component="main" css={styles.pageMinHeight}>
        <Container maxWidth="md">
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ mt: 12, mb: 4 }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box
            sx={{
              backgroundColor: '#EEFFFF	',
              mb: 6,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircleIcon fontSize="medium" sx={{ mr: 1, color: '#005FFF' }} />
            <Typography component="p" variant="body2">
              相談の投稿が完了しました
            </Typography>
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
              ご投稿した相談に関する注意書き
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#FFFFCC',
              mb: 4,
              p: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <WarningIcon fontSize="large" sx={{ mr: 1, color: '#FF9900' }} />
            <Typography component="p" variant="body2">
              回答についてすべての質問に保険のプロから回答がつくとは限りませんので、何卒ご理解いただきますようお願いいたします。
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px 0px',
            }}
          >
            <Link href={'/current/articles/' + articleId}>
              <Button
                variant="contained"
                sx={{
                  width: 250,
                  boxShadow: 'none',
                  borderRadius: 1,
                  textTransform: 'none',
                  fontSize: { xs: 12, sm: 16 },
                  fontWeight: 'bold',
                }}
              >
                <MessageIcon fontSize="small" sx={{ mr: 0.5 }} />
                投稿した相談へ
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="text"
                sx={{
                  width: 250,
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
        </Container>
      </Box>
    </Box>
  )
}

export default EditCompletion
