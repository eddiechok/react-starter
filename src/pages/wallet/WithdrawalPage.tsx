import useGetWalletBalance from '@/api/get/useGetWalletBalance';
import useGetWithdrawSetting from '@/api/get/useGetWithdrawSetting';
import usePostWithdraw, { WithdrawParams } from '@/api/post/usePostWithdraw';
import Form from '@/components/hook-form/Form';
import FormSelect from '@/components/hook-form/FormSelect';
import FormTextField from '@/components/hook-form/FormTextField';
import DataWrapper from '@/components/ui/DataWrapper';
import AppContainer from '@/layout/AppContainer';
import AuthenticatedLayout from '@/layout/AuthenticatedLayout';
import { useSecPwDialog } from '@/providers/SecondaryPasswordDialogProvider';
import { useToast } from '@/providers/ToastProvider';
import { Yup } from '@/shared/constants';
import {
  dp,
  hasQueriesData,
  isQueriesLoading,
  reloadQueries
} from '@/shared/functions';
import { SelectOption } from '@/shared/type';
import commonLabel from '@/translation/commonLabel';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { SchemaOf } from 'yup';

type FormValues = Omit<
  WithdrawParams,
  'secondary_pin' | 'ewallet_type_code' | 'withdraw_type'
>;

const WithdrawalPage = () => {
  const { t } = useTranslation();
  const { mutate } = usePostWithdraw();
  const [presentSecPw] = useSecPwDialog();
  const [presentToast] = useToast();
  const { from } = useParams();
  const walletBalance = useGetWalletBalance();
  const wallet = useMemo(
    () => walletBalance.data?.find((ewt) => ewt.ewallet_type_code === from),
    [from, walletBalance.data]
  );

  const withdrawSetting = useGetWithdrawSetting(
    { ewallet_type_code: wallet?.ewallet_type_code || '' },
    {
      enabled: !!wallet
    }
  );
  const withdrawToOptions = useMemo<SelectOption[]>(
    () =>
      withdrawSetting.data?.withdraw_to.map((item) => ({
        title: item.ewallet_type_name_to,
        value: item.ewallet_type_code_to
      })) || [],
    [withdrawSetting.data?.withdraw_to]
  );

  const schema = useMemo<SchemaOf<FormValues>>(
    () =>
      Yup.object({
        address: Yup.string().required(),
        amount: Yup.number()
          .required()
          // .min(withdrawSetting.data?.min || 0)
          // .max(withdrawSetting.data?.max || Infinity)
          .max(wallet?.balance || 0, t(commonLabel.insufficient_balance)),
        ewallet_type_code_to: Yup.string().required()
      }),
    [wallet?.balance, t]
  );

  const methods = useForm<FormValues>({
    defaultValues: {
      address: '',
      amount: 0,
      ewallet_type_code_to: ''
    },
    resolver: yupResolver(schema)
  });
  const { reset, setValue } = methods;

  const walletCodeTo = methods.watch('ewallet_type_code_to');
  const walletTo = useMemo(
    () =>
      withdrawSetting.data?.withdraw_to.find(
        (item) => item.ewallet_type_code_to === walletCodeTo
      ),
    [walletCodeTo, withdrawSetting.data?.withdraw_to]
  );

  const onSubmit: SubmitHandler<FormValues> = (values, e) => {
    presentSecPw({
      onSuccess: (password) => {
        mutate(
          {
            ...values,
            secondary_pin: password,
            ewallet_type_code: wallet?.ewallet_type_code || ''
          },
          {
            onSuccess: (res) => {
              e?.target.reset();
              presentToast({
                message: res.msg,
                color: 'success'
              });
              walletBalance.refetch();
            }
          }
        );
      }
    });
  };

  useEffect(() => {
    withdrawSetting.data?.withdraw_to[0] &&
      setValue(
        'ewallet_type_code_to',
        withdrawSetting.data.withdraw_to[0].ewallet_type_code_to
      );
  }, [setValue, withdrawSetting.data?.withdraw_to]);

  return (
    <AuthenticatedLayout>
      <AppContainer>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <DataWrapper
              isLoading={isQueriesLoading(walletBalance, withdrawSetting)}
              haveData={
                hasQueriesData(walletBalance, withdrawSetting) && !!wallet
              }
              onReload={() => reloadQueries(walletBalance, withdrawSetting)}
            >
              <Form
                methods={methods}
                onSubmit={onSubmit}
                onReset={() =>
                  reset({
                    amount: 0,
                    address: '',
                    ewallet_type_code_to:
                      withdrawSetting.data?.withdraw_to[0]
                        .ewallet_type_code_to || ''
                  })
                }
              >
                <Stack>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      borderRadius: 3,
                      p: 2
                    }}
                  >
                    <Avatar
                      src={wallet?.setup.app_setting_list.wallet_type_image_url}
                    />
                    <Box>
                      <Typography variant="body2">
                        {wallet?.ewallet_type_name}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {wallet?.balance_str}
                      </Typography>
                    </Box>
                  </Box>
                  <FormSelect
                    options={withdrawToOptions}
                    name="ewallet_type_code_to"
                    label={t(commonLabel.wallet_to)}
                    required
                    fullWidth
                  />
                  <FormTextField
                    name="address"
                    label={t(commonLabel.withdrawal_to)}
                    placeholder={t(commonLabel.enter_address)}
                    required
                    fullWidth
                  />
                  <FormTextField
                    name="amount"
                    dp={wallet?.decimal_point}
                    label={t(commonLabel.amount)}
                    placeholder={dp(0, wallet?.decimal_point)}
                    required
                    fullWidth
                  />
                  {!!walletTo?.admin_fee_perc && (
                    <Typography variant="body1">
                      *{walletTo.admin_fee_perc * 100}%{' '}
                      {t(commonLabel.admin_fee)}
                    </Typography>
                  )}
                </Stack>
                <Button
                  sx={{
                    mt: 8,
                    mx: 'auto',
                    display: 'block'
                  }}
                  type="submit"
                >
                  {t(commonLabel.submit)}
                </Button>
              </Form>
            </DataWrapper>
          </CardContent>
        </Card>
      </AppContainer>
    </AuthenticatedLayout>
  );
};

export default WithdrawalPage;
