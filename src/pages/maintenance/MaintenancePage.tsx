import { Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import commonLabel from '../../translation/commonLabel';

const MaintenancePage = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: 'center' }}>
        {t(commonLabel.under_maintenance)}
      </Typography>
    </Container>
  );
};

export default MaintenancePage;
