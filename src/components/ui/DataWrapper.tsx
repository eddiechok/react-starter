import commonLabel from '@/translation/commonLabel';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

type DataWrapperProps = PropsWithChildren<{
  isLoading: boolean;
  haveData: boolean;
  onReload?: () => void;
}>;

const DataWrapper = ({
  isLoading,
  children,
  haveData,
  onReload
}: DataWrapperProps) => {
  const { t } = useTranslation();

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : haveData ? (
        children
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: ' center',
            flexDirection: 'column',
            py: 8
          }}
        >
          <BarChartRoundedIcon />
          <Typography variant="body2" sx={{ mb: 4 }}>
            {t(commonLabel.no_data)}
          </Typography>
          <Button
            onClick={onReload}
            color="primary"
            variant="text"
            size="small"
          >
            {t(commonLabel.retry)}
          </Button>
        </Box>
      )}
    </>
  );
};

export default DataWrapper;
