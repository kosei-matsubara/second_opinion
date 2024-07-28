import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#D10E0E',
    },
    secondary: {
      main: '#F46969',
    },
    custom: {
      h2backgroundColor: '#F46969',
      h2color: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
