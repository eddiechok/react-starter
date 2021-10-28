import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import { useLoading } from '../../contexts/LoadingContext';
import appRoutes from '../../routes/app-routes';

const MemberGateway = () => {
  const { i18n } = useTranslation();
  const { token, lang } = useParams<{ token: string; lang: string }>();
  const { login } = useApp();
  const history = useHistory();
  const [present, dismiss] = useLoading();

  useEffect(() => {
    present();
    login(token, true);
    i18n.changeLanguage(lang);
    dismiss();
    history.replace(appRoutes.home);
  }, [history, i18n, lang, login, token]);

  return null;
};

export default MemberGateway;
