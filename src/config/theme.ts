import { createTheme, listItemTextClasses, ThemeOptions } from '@mui/material';

let theme = createTheme({
  spacing: 4
});

theme = createTheme(theme, {
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg'
      }
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: (theme.shape.borderRadius as number) * 2
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      }
    },
    MuiStack: {
      defaultProps: {
        spacing: 4
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: theme.palette.error.main
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        inset: {
          paddingLeft: 16
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        inputSizeSmall: {
          [`.${listItemTextClasses.root}`]: {
            margin: 0 // remove margin for select to have same height with text field
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          ['&:last-child td, &:last-child th']: { border: 0 }
        }
      }
    }
  }
} as ThemeOptions);

export default theme;
