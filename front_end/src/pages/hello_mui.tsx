import { css } from '@emotion/react'
import { Button } from '@mui/material'
import type { NextPage } from 'next'

const ButtonCss = css({
  padding: '24px',
})

const HelloMui: NextPage = () => {
  return (
    <div>
      <Button variant="contained" css={ButtonCss}>
        Button1
      </Button>
      <Button variant='outlined' css={ButtonCss}>
        Button2
      </Button>
      <Button variant='contained' color='error' css={ButtonCss}>
        Button3
      </Button>
    </div>
  )
}

export default HelloMui
