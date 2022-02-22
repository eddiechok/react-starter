import AppContainer from '@/layout/AppContainer';
import commonLabel from '@/translation/commonLabel';
import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const MaintenancePage = () => {
  const { t } = useTranslation();

  return (
    <AppContainer>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {t(commonLabel.under_maintenance)}
      </Typography>
    </AppContainer>
  );
};

export default MaintenancePage;
