import { SxProps } from '@mui/system/styleFunctionSx';

const commonAspectRatio: SxProps = {
  position: 'relative',
  '& > *': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
};

export const aspectRatio = {
  '16/9': {
    ...commonAspectRatio,
    pt: 'min(56.25%, 180px)'
  },
  '4/3': {
    ...commonAspectRatio,
    pt: '75%'
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

export const truncateSx: SxProps = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
