import { Box } from '@mui/material'
import Image from 'next/image'
import { styles } from '@/styles'

const Loading = () => {
  return (
    <Box
      css={styles.pageMinHeight} // LoadingのImageを表示中、画面にFooterを表示しないようMinHeightを定義する
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image src="/loading.svg" width={150} height={150} alt="loading..." priority />
    </Box>
  )
}

export default Loading
