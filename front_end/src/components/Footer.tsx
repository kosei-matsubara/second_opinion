import { Box, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: 'center',
        p: 4,
        mt: 4,
        backgroundColor: '#000',
        color: '#fff',
      }}
    >
      <Typography component="p">Copyright All Rights Reserved.</Typography>
      <Typography component="p">ああああああ</Typography>
    </Box>
  )
}

export default Footer
