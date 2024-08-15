import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import InfoIcon from '@mui/icons-material/Info'
import SendIcon from '@mui/icons-material/Send'
import WarningIcon from '@mui/icons-material/Warning'
import { LoadingButton } from '@mui/lab'
import {
  AppBar,
  Box,
  Container,

// ステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバー
  Stepper,
  Step,
  StepLabel,


  TextField,
  Typography,
  Button,
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import axios, { AxiosError } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import Breadcrumbs from '@/components/Breadcrumbs'
import { categoryOptions } from '@/components/CategoryOptions'
import Error from '@/components/Error'
import Loading from '@/components/Loading'
import { useUserState, useSnackbarState } from '@/hooks/useGlobalState'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { styles } from '@/styles'
import { fetcher } from '@/utils'

// ステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバー
const steps = ['相談内容入力', '相談内容確認', '相談投稿完了']

// ステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバーステップバー
const activeStep = 3



const edit_completion: NextPage = () => {
  return (
    <Box>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default edit_completion
