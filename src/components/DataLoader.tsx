import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import commonLabel from '../translation/commonLabel';

type DataLoaderProps = {
  hasNextPage?: boolean;
  onScroll?: () => void;
};

const DataLoader = ({ hasNextPage = false, onScroll }: DataLoaderProps) => {
  const { t } = useTranslation();

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: () => {
      onScroll && onScroll();
    },
    disabled: !hasNextPage,
    rootMargin: '0px 0px 100px 0px'
  });

  return (
    <Box ref={sentryRef} sx={{ display: 'flex', justifyContent: 'center' }}>
      <>
        {hasNextPage ? (
          <CircularProgress />
        ) : (
          <Typography
            sx={{ my: 4, textAlign: 'center', color: 'GrayText' }}
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
