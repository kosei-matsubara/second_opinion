import { Snackbar, Alert } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSnackbarState } from '@/hooks/useGlobalState'

const SuccessSnackbar = () => {
  const router = useRouter()
  const [snackbar, setSnackbar] = useSnackbarState()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (snackbar.pathname == router.pathname) {
      setOpen(true)
    }
  }, [snackbar, router])

  // 通知バー表示後に閉じる
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setSnackbar({ message: null, severity: null, pathname: null })
  }

  return (
    <div>
      {snackbar.severity != null && (
        // 表示内容を確認するため一時的にautoHideDurationを2000から20000に延伸している
        <Snackbar open={open} autoHideDuration={20000} onClose={handleClose}>
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
