import '@mui/lab/themeAugmentation'; // get the types for lab in theme configuration
import {
  createTheme,
  listItemTextClasses,
  PaletteMode,
  ThemeOptions
} from '@mui/material';

const getTheme = (mode?: PaletteMode) => {
  // default theme
  let theme = createTheme({
    palette: {
      mode
    },
    spacing: 4,
    typography: {
      subtitle1: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
      },
      subtitle2: {
        textTransform: 'uppercase',
        fontWeight: 'bold'
      }
    }
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
      },
      MuiGrid: {
        defaultProps: {
          spacing: 4
        }
      }
    }
  } as ThemeOptions);

  return theme;
};

export default getTheme;
