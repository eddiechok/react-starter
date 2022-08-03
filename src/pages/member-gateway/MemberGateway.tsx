import useCustomNavigate from '@/hooks/useCustomNavigate';
import { useApp } from '@/providers/AppProvider';
import appRoutes from '@/routes/app-routes';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

const MemberGateway = () => {
  const { i18n } = useTranslation();
  const { token, lang } = useParams<'token' | 'lang'>();
  const { login, isAuthenticated } = useApp();
  const navigate = useCustomNavigate();

  useEffect(() => {
    token && login(token, true);
  }, [login, token]);

  useEffect(() => {
    if (isAuthenticated) {
      i18n.changeLanguage(lang).then(() => {
        navigate(appRoutes.home);
      });
    }
  }, [i18n, isAuthenticated, lang, navigate]);

  return null;
};

export default MemberGateway;
