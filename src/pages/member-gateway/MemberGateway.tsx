import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import appRoutes from '../../routes/app-routes';

const MemberGateway = () => {
  const { i18n } = useTranslation();
  const { token, lang } = useParams<'token' | 'lang'>();
  const { login } = useApp();
  const navigate = useCustomNavigate();

  useEffect(() => {
    token && login(token, true);
    i18n.changeLanguage(lang).then(() => {
      navigate(appRoutes.home);
    });
  }, [navigate, i18n, lang, login, token]);

  return null;
};

export default MemberGateway;
