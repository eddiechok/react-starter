import { createTheme, ThemeOptions } from "@mui/material";

let theme = createTheme({
  spacing: 4,
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg'
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "contained"
      }
    },
    MuiStack: {
      defaultProps: {
        spacing: 4
      }
    }
  }
});

theme = createTheme(theme, {
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: theme.palette.error.main
        }
      }
    }
  } 
} as ThemeOptions)

export default theme