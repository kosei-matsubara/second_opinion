/* eslint-disable prettier/prettier */
import {
  Box,
  Typography,
} from '@mui/material'

const Main = () => {
  return (
    <Box
      sx={{
          width: 500,           // 幅を200ピクセルに設定
          maxWidth: '100%',     // 最大幅を100%に設定
          minWidth: 50,          // 最小幅を50ピクセルに設定

          height: 200,          // 高さを100ピクセルに設定
          maxHeight: '100vh',    // 最大高さをビューポートの高さの100%に設定
          minHeight: 50,         // 最小高さを50ピクセルに設定

          // border: '2px solid black',   // 境界線を1ピクセルの黒色でsolidスタイルに設定
          borderWidth: 2,              // 境界線の幅を2ピクセルに設定
          borderTopWidth: 4,           // 上部の境界線の幅を3ピクセルに設定
          borderLeftWidth: 6,          // 左側の境界線の幅を4ピクセルに設定

          borderStyle: 'solid',        // 境界線のスタイルをsolidに設定
          borderRightStyle: 'dashed',  // 右側の境界線のスタイルをdashedに設定

          borderColor: 'red',          // 境界線の色を赤に設定
          borderBottomColor: 'blue',   // 下部の境界線の色を青に設定

          // padding: '10px',             // 内側の余白を10ピクセルに設定
          // margin: '20px',             // 外側の余白を20ピクセルに設定

          position: 'relative', // 相対位置を設定

          top: 10,              // relative位置を使用する場合の上端からの距離を10ピクセル設定
          left: 20,             // relative位置を使用する場合の左端からの距離を20ピクセル設定
      }}
    >
      {/* タイトルスタイルのテキスト */}
      <Typography
        variant="h1"            // テキストスタイルをh1に設定
        component="h1"          // HTMLタグをh1に設定
        align="center"          // テキストを中央に配置
        gutterBottom            // 下にマージンを追加
        sx={{ color: 'blue' }}  // カスタムスタイル（青色）
      >
        タイトル
      </Typography>
      {/* ボディテキストスタイルのテキスト */}
      <Typography
        variant="body1"         // テキストスタイルをbody1に設定
        component="p"           // HTMLタグをpに設定
        align="justify"         // テキストを両端揃え
        paragraph               // 段落として表示
        sx={{
          color: 'black',       // 黒色
          fontSize: '18px',     // フォントサイズ18px
          lineHeight: 1.6,      // 行間1.6
        }}
      >
        段落、本文
      </Typography>
    </Box>
  )
}

export default Main

// # 目的
// Typographyコンポーネントのサイズや位置定義のプロパティを知りたい
// かつプロパティをコードにしたい

// # 回答範囲
// Next.js
// Material-UI
// を活用する具体的なコード例を教えてください。

// # 前提条件
// Next.js と Material-UI をプロジェクトにインストールは対応済み
// コード可読性が高い
// コードに補足コメントを追加
// ステップ末尾の;は不要

// # 出力形式
// コードを含む回答をお願いします。また、それぞれの言語ごとにコメントも追加してください。
