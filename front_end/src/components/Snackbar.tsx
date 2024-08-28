import { Snackbar, Alert } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSnackbarState } from '@/hooks/useGlobalState'

const SuccessSnackbar = () => {
  const router = useRouter()
  const [snackbar, setSnackbar] = useSnackbarState()
  const [open, setOpen] = useState(false)

  // Snackbarを表示する条件を監視する
  useEffect(() => {
    if (snackbar.pathname == router.pathname) {
      setOpen(true)
    }
  }, [snackbar, router])

  // 通知バー表示後に閉じる
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    // Snackbarを閉じる
    setOpen(false)
    // Snackbarの状態をリセットする
    setSnackbar({ message: null, severity: null, pathname: null })
  }

  return (
    <div>
      {snackbar.severity != null && (
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
          // 表示画面やScrollToTopなどの表示と重複させないため、snackbarの表示位置を左下にする
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

export default SuccessSnackbar
