import commonLabel from '@/translation/commonLabel';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type DataLoaderProps = {
  hasNextPage?: boolean;
  onScroll?: () => Promise<any>;
};

const DataLoader = ({ hasNextPage = false, onScroll }: DataLoaderProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => {
      setLoading(true);
      onScroll?.().then(() => setLoading(false));
    },
    disabled: !hasNextPage,
    rootMargin: '0px 0px 100px 0px'
  });

  return (
    <Box
      ref={sentryRef}
      sx={{ display: 'flex', justifyContent: 'center', py: 4 }}
    >
      <>
        {hasNextPage ? (
          <CircularProgress />
        ) : (
          <Typography
            sx={{ textAlign: 'center', color: 'GrayText' }}
            variant="body2"
          >
            {t(commonLabel.no_more_data)}
          </Typography>
        )}
      </>
    </Box>
  );
};

export default DataLoader;
