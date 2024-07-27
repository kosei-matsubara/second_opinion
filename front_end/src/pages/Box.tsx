/* eslint-disable prettier/prettier */
import {
  Box,
  Typography,
} from '@mui/material'

const Main = () => {
  return (
    <Box
      sx={{
          width: 1000,           // 幅をピクセル単位に設定
          maxWidth: '100%',     // 最大幅を100%に設定
          minWidth: 50,          // 最小幅を50ピクセルに設定

          overflowY: "scroll",  // 最大高さを超えた場合はスクロールバー
          // •	overflow: "visible": コンテンツがボックスの枠を超えた場合、はみ出た部分も表示されます（デフォルト）。
          // •	overflow: "hidden": コンテンツがボックスの枠を超えた場合、はみ出た部分は表示されずに隠されます。
          // •	overflow: "scroll": コンテンツがボックスの枠を超えた場合、スクロールバーが表示されます。
          // •	overflow: "auto": コンテンツがボックスの枠を超えた場合にのみスクロールバーが表示されます。

          height: 600,          // 高さをピクセル単位に設定
          maxHeight: '100vh',    // 最大高さをビューポートの高さの100%に設定
          minHeight: 50,         // 最小高さを50ピクセルに設定

          backgroundColor: 'lightblue', // 背景色をライトブルーに設定
          color: 'black',          // テキストの色を黒に設定

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
          // marginTop: '16px',          // 上にマージン
          // marginRight: '16px',        // 右にマージン
          // marginBottom: '16px',       //  下にマージン
          // marginLeft: '16px',         // 左にマージン

          position: 'relative', // 相対位置を設定

          top: 10,              // relative位置を使用する場合の上端からの距離を10ピクセル設定
          left: 20,             // relative位置を使用する場合の左端からの距離を20ピクセル設定
      }}
    >
      普通のBox
      <Box
        sx={{
            display: 'flex',         // フレックスボックスを使用
            flexDirection: 'row', // アイテムを垂直方向に配置
            // •	flexDirection: "row": フレックスアイテムが水平方向（左から右）に配置されます（デフォルト）。
            // •	flexDirection: "column": フレックスアイテムが垂直方向（上から下）に配置されます。
            // •	flexDirection: "row-reverse": フレックスアイテムが水平方向に逆順（右から左）に配置されます。
            // •	flexDirection: "column-reverse": フレックスアイテムが垂直方向に逆順（下から上）に配置されます。
            // •	flexWrap: "nowrap": フレックスアイテムが一行に収まるように配置されます（デフォルト）。
            // •	flexWrap: "wrap": フレックスアイテムが必要に応じて複数行に折り返されます。
            // •	flexWrap: "wrap-reverse": フレックスアイテムが必要に応じて複数行に折り返され、行の順序が逆になります。

            alignItems: 'center',    // コンテンツをタテ中央揃え
            justifyContent: 'center',// コンテンツを横中央揃え
            width: 300,              // 幅を300ピクセルに設定
            height: 100,             // 高さを200ピクセルに設定
            backgroundColor: 'lightgreen', // 背景色をライトグリーンに設定
          }}
      >
        Flex Box 文字1
        Flex Box 文字2
      </Box>
      <Box
        sx={{
          display: 'grid',         // グリッドレイアウトを使用
          gridTemplateColumns: 'repeat(3, 1fr)', // 3列のグリッドを定義
          gap: 2,                  // グリッドのギャップをテーマのスペーシング単位で設定
          width: '100%',           // 幅を100%に設定
          height: 100,             // 高さを200ピクセルに設定
          backgroundColor: 'lightcoral', // 背景色をライトコーラルに設定
        }}
      >
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
      </Box>
      {/* タイトルスタイルのテキスト */}
      <Typography
        variant="h1"            // テキストスタイルをh1に設定
        component="h1"          // HTMLタグをh1に設定
        align="center"          // テキストを中央に配置
        gutterBottom            // 下にマージンを追加
        sx={{
          // position: 'absolute', // 子要素を絶対位置に設定
          // top: '50%',           // 親要素の高さの50%に設定
          // left: '10%',          // 親要素の幅の50%に設定
          // transform: 'translate(-10%, -50%)', // 要素を自身の幅と高さの50%だけ移動

          color: 'blue',                 // カスタムスタイル（青色）
          // fontSize: '18px',          // フォントサイズ18px
          fontSize: { xs: "1rem", sm: "1.5rem", xl: "2rem" },
          lineHeight: 1.6,              // 行間1.6
          textDecoration: "underline",
          whiteSpace: "pre-wrap",       // テキストの空白と改行を保持し、必要に応じて折り返す
          cursor: "pointer",
        }}
      >
        Typography・タイトル <br />
        Typography・タイトル・改行
      </Typography>
      {/* ボディテキストスタイルのテキスト */}
      <Typography
        variant="body1"         // テキストスタイルをbody1に設定
        component="p"           // HTMLタグをpに設定
        align="justify"         // テキストを両端揃え
        paragraph               // 段落として表示
        sx={{
          color: 'black',       // 黒色
        }}
      >
        Typography・段落、本文
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
