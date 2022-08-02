import { buttonClasses } from '@mui/material/Button';
import { Theme } from '@mui/material/styles/createTheme';
import { svgIconClasses } from '@mui/material/SvgIcon';
import { tableCellClasses } from '@mui/material/TableCell';
import { SxProps } from '@mui/system/styleFunctionSx';

const commonAspectRatio: SxProps<Theme> = {
  position: 'relative',
  '& > *': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};

// export const defaultTableContainerSx: SxProps<Theme> = {
//   [`& .${tableCellClasses.head}`]: (theme) => ({
//     backgroundColor: theme.palette.background.dark,
//     color: theme.palette.grey[400]
//   }),
//   [`& .${tableCellClasses.body}`]: (theme) => ({
//     color: theme.palette.grey[800]
//   })
// };

export const styles = {
  rounded: {
    borderRadius: 15
  },
  text: {
    truncate: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    } as SxProps<Theme>
  },
  button: {
    icon: {
      minWidth: 40,
      width: 40,
      height: 40,
      p: 2,
      [`&.${buttonClasses.sizeSmall}`]: {
        p: 1,
        minWidth: 28,
        width: 28,
        height: 28,
        [`.${svgIconClasses.root}`]: {
          fontSize: 20
        }
      },
      [`&.${buttonClasses.sizeLarge}`]: {
        minWidth: 56,
        width: 56,
        height: 56,
        [`.${svgIconClasses.root}`]: {
          fontSize: 32
        }
      }
    }
  },
  table_container: {
    default: {
      borderRadius: 2,
      border: 1,
      borderColor: 'grey.300',
      [`& .${tableCellClasses.head}`]: (theme) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        typography: 'body2'
      }),
      [`& .${tableCellClasses.body}`]: (theme) => ({
        color: theme.palette.common.black,
        // borderBottomColor: '#ffffff',
        py: 3
      })
    } as SxProps<Theme>
  },
  shadow: {
    small: '1px 1px 6px rgba(0, 0, 0, 0.03)',
    inner: '2px 2px 2px 0px #0000000D inset'
  },
  aspectRatio: {
    '16/9': {
      ...commonAspectRatio,
      pt: 'min(56.25%, 500px)'
    },
    '4/3': {
      ...commonAspectRatio,
      pt: '75%'
    },
    '5/2': {
      ...commonAspectRatio,
      pt: '40%'
    },
    '5/1': {
      ...commonAspectRatio,
      pt: 'max(20%, 150px)'
    },
    '3/4': {
      ...commonAspectRatio,
      pt: '133%'
    }
  }
};
