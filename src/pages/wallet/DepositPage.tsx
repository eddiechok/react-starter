import useGetCryptoDetail from '@/api/get/useGetCryptoDetail';
import useGetWalletBalance from '@/api/get/useGetWalletBalance';
import AppDialog from '@/components/ui/AppDialog';
import DataWrapper from '@/components/ui/DataWrapper';
import useAutoToggle from '@/hooks/useAutoToggle';
import { useToast } from '@/providers/ToastProvider';
import {
  copyToClipboard,
  hasQueriesData,
  isQueriesLoading,
  reloadQueries
} from '@/shared/functions';
import commonLabel from '@/translation/commonLabel';
import { Alert, Box, Button, Typography } from '@mui/material';
import Qrcode from 'qrcode.react';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

const DepositPage = () => {
  const { t } = useTranslation();
  const [presentToast] = useToast();
  const walletBalance = useGetWalletBalance();
  const { from, to } = useParams();
  const { isOpen, dismiss } = useAutoToggle();

  const walletFrom = useMemo(
    () =>
      walletBalance.data
        ?.find((wallet) => wallet.ewallet_type_code === to)
        ?.setup.blockchain_deposit.find((bc) => bc.ewallet_type_code === from),
    [from, to, walletBalance.data]
  );

  const cryptoDetail = useGetCryptoDetail(
    {
      crypto_code: from || '',
      ewallet_type_code: to || ''
    },
    {
      refetchOnMount: false
    }
  );

  const address = useMemo(
    () => cryptoDetail.data?.active_order?.crypto_address || '',
    [cryptoDetail.data?.active_order?.crypto_address]
  );

  const onCopy = () => {
    copyToClipboard(address).then(() => {
      presentToast({
        message: t(commonLabel.copied_to_clipboard)
      });
    });
  };

  return (
    <AppDialog open={isOpen} onDismiss={dismiss} title={t(commonLabel.deposit)}>
      <DataWrapper
        isLoading={isQueriesLoading(cryptoDetail, walletBalance)}
        haveData={!!address && hasQueriesData(cryptoDetail, walletBalance)}
        onReload={() => reloadQueries(cryptoDetail, walletBalance)}
      >
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Alert
            severity="warning"
            sx={{ mb: 8, textAlign: 'left', alignItems: 'center' }}
          >
            {t(
              commonLabel.please_ensure_you_enter_the_correct_blockchain_address
            )}
          </Alert>
          <Qrcode
            value={address}
            renderAs="svg"
            size={150}
            includeMargin
            style={{
              margin: 'auto',
              display: 'block'
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: 'center',
              mb: 2,
              mt: 4,
              fontSize: (theme) => theme.typography.caption.fontSize
            }}
          >
            {walletFrom?.ewallet_type_name} {t(commonLabel.address)}
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                wordBreak: 'break-word'
              }}
            >
              {address}
            </Typography>
          </Box>
          <Button onClick={onCopy}>{t(commonLabel.copy_address)}</Button>
        </Box>
      </DataWrapper>
    </AppDialog>
  );
};

export default DepositPage;
