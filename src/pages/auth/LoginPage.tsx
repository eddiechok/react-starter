import { yupResolver } from '@hookform/resolvers/yup';
import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Toolbar
} from '@mui/material';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SchemaOf } from 'yup';
import usePostLogin, { LoginParams } from '../../api/post/usePostLogin';
import Form from '../../components/hook-form/Form';
import FormTextField from '../../components/hook-form/FormTextField';
import LanguageButton from '../../components/ui/LanguageButton';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import AppContainer from '../../layout/AppContainer';
import { useApp } from '../../providers/AppProvider';
import appRoutes from '../../routes/app-routes';
import { Yup } from '../../shared/constants';
import commonLabel from '../../translation/commonLabel';
import i18n from '../../translation/i18n';

type FormValues = Pick<LoginParams, 'username' | 'password'>;

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useCustomNavigate();
  const { login } = useApp();
  const { mutate } = usePostLogin();

  const schema = useMemo<SchemaOf<FormValues>>(
    () =>
      Yup.object({
        username: Yup.string().required().username(),
        password: Yup.string().required().password()
      }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        ...values,
        lang_code: i18n.languages[0],
        login_type: 'username'
      },
      {
        onSuccess: (data) => {
          login(data.access_token);
        }
      }
    );
  };

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar sx={{ justifyContent: 'flex-end' }}>
          <LanguageButton />
        </Toolbar>
      </AppBar>
      <AppContainer maxWidth="xs">
        <Card>
          <CardHeader
            title={t(commonLabel.login)}
            subheader="Login to dashboard"
          />
          <CardContent>
            <Form methods={methods} onSubmit={onSubmit}>
              <Stack spacing={4}>
                <FormTextField
                  name="username"
                  label={t(commonLabel.username)}
                  required
                  fullWidth
                />
                <FormTextField
                  name="password"
                  label={t(commonLabel.password)}
                  type="password"
                  required
                  fullWidth
                />
                <Stack direction="row" spacing={4}>
                  <Button variant="contained" color="primary" type="submit">
                    {t(commonLabel.login)}
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(appRoutes.auth.register)}
                  >
                    {t(commonLabel.sign_up)}
                  </Button>
                </Stack>
              </Stack>
            </Form>
          </CardContent>
        </Card>
      </AppContainer>
    </>
  );
};

export default LoginPage;
