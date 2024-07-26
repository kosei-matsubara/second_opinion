import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { Fab } from '@mui/material'
import { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [show, setShow] = useState(false)

  // スクロールイベントを監視してボタンの表示/非表示を切り替える
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true)
      } else {
        setShow(false)
      }
    }

    // スクロール位置情報を記録する
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // スクロールを一番上に移動する
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    show && (
      <Fab
        color="primary"
        size="small"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
      >
        <ArrowUpwardIcon />
      </Fab>
    )
  )
}

export default ScrollToTop
