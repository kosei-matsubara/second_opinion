import ArticleIcon from '@mui/icons-material/Article'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Logout from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import MessageIcon from '@mui/icons-material/Message'
import LoginIcon from '@mui/icons-material/Login'
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
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const [user] = useUserState()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const router = useRouter()

  // 記事編集画面ではnullをreturnしてHeaderを非表示にする
  const hideHeaderPathnames = ['/current/articles/edit/[id]']
  if (hideHeaderPathnames.includes(router.pathname)) return <></>

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const addNewArticle = () => {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/current/articles'

    const headers = {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    axios({ method: 'POST', url: url, headers: headers })
      .then((res: AxiosResponse) => {
        router.push('/current/articles/edit/' + res.data.id)
      })
      .catch((e: AxiosError<{ error: string }>) => {
        console.log(e.message)
      })
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
          <Box sx={{ m: 2 }}>
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
                <Box>
                  <Link href="/sign_in">
                    <Button
                      variant="contained"
                      sx={{
                        width: 130,
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
                      <LoginIcon fontSize="small" sx={{ m: 0.5 }} />
                      ログイン
                    </Button>
                  </Link>
                  <Link href="/sign_up">
                    <Button
                      variant="text"
                      sx={{
                        width: 130,
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
                      <PersonAddIcon fontSize="small" sx={{ m: 0.5 }} />
                      会員登録
                    </Button>
                  </Link>
                </Box>
              )}
              {/* ユーザー認証済のHeader表示内容 */}
              {user.isSignedIn && (
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ m: 1 }}>
                    <Button
                      color="primary"
                      variant="contained"
                      sx={{
                        color: 'white',
                        textTransform: 'none',
                        fontSize: 16,
                        borderRadius: 2,
                        width: 190,
                        boxShadow: 'none',
                      }}
                      onClick={addNewArticle}
                    >
                      <MessageIcon fontSize="small" sx={{ m: 0.5 }} />
                      保険相談を投稿
                    </Button>
                  </Box>
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
                      <Typography sx={{ fontWeight: 'bold' }}>
                        {user.name} 様
                      </Typography>
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
