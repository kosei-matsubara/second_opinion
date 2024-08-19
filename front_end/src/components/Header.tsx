import ArticleIcon from '@mui/icons-material/Article'
import LoginIcon from '@mui/icons-material/Login'
import Logout from '@mui/icons-material/Logout'
import MessageIcon from '@mui/icons-material/Message'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@mui/material'
import axios, { AxiosResponse, AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const router = useRouter()
  const [user] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null) // メニューモーダルの開閉を判定する
  const open = Boolean(anchorEl) // メニューモーダルの開閉を判定する

  // 以下URLにおいてnullをreturnしてHeaderを非表示後、個別画面用のHeaderを表示する
  const hideHeaderPathnames = ['/current/articles/edit/[id]'] // 相談編集画面
  if (hideHeaderPathnames.includes(router.pathname)) return <div></div>

  const addNewArticle = () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles'

    // APIリクエストのheaderを定義する
    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    axios({
      method: 'POST',
      url: url,
      headers: headers,
    })
      .then((res: AxiosResponse) => {
        // 相談投稿画面に遷移する
        router.push('/current/articles/edit/' + res.data.id)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
  }

  // クリックされた要素の位置を保存、メニューの表示位置を設定する
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FFFFFF',
        boxShadow: 'none',
        color: '#000000',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ m: 1 }}>
            <Link href="/">
              <Typography component="p" variant="h5">
                保険のセカンドオピニオン
              </Typography>
            </Link>
          </Box>
          {user.isFetched && (
            <div>
              {/* ユーザー未認証のHeader表示内容 */}
              {!user.isSignedIn && (
                <Box sx={{ display: 'flex' }}>
                  <Link href="/sign_in">
                    <Button
                      variant="contained"
                      sx={{
                        width: 150,
                        boxShadow: 'none',
                        border: '1.5px solid #D10E0E',
                        borderRadius: 1,
                        m: 1,
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}
                    >
                      <LoginIcon fontSize="small" sx={{ mr: 0.5 }} />
                      サインイン
                    </Button>
                  </Link>
                  <Link href="/sign_up">
                    <Button
                      variant="text"
                      sx={{
                        width: 150,
                        backgroundColor: '#FFFFFF',
                        boxShadow: 'none',
                        border: '1.5px solid #000000',
                        borderRadius: 1,
                        m: 1,
                        textTransform: 'none',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000000',
                      }}
                    >
                      <PersonAddIcon fontSize="small" sx={{ mr: 0.5 }} />
                      会員登録
                    </Button>
                  </Link>
                </Box>
              )}
              {/* ユーザー認証済のHeader表示内容 */}
              {user.isSignedIn && (
                <Box sx={{ display: 'flex' }}>
                  <Button
                    variant="contained"
                    sx={{
                      width: 180,
                      boxShadow: 'none',
                      border: '1.5px solid #D10E0E',
                      borderRadius: 1,
                      m: 1,
                      textTransform: 'none',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}
                    onClick={addNewArticle}
                  >
                    <MessageIcon fontSize="small" sx={{ mr: 0.5 }} />
                    保険相談を投稿
                  </Button>
                  <IconButton onClick={handleClick} sx={{ mx: 1 }}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                  >
                    <Box sx={{ pl: 2, py: 1 }}>
                      <Typography sx={{ fontWeight: 'bold' }}>{user.name} 様</Typography>
                    </Box>
                    <Divider />
                    <Link href={"/current/articles"}>
                      <MenuItem>
                        <ListItemIcon>
                          <ArticleIcon fontSize="small" />
                        </ListItemIcon>
                        記事の管理
                      </MenuItem>
                    </Link>
                    <Link href="/sign_out">
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        サインアウト
                      </MenuItem>
                    </Link>
                  </Menu>
                </Box>
              )}
            </div>
          )}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Header
