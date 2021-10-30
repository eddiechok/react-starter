import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router';
import { useApp } from '../../contexts/AppContext';
import appRoutes from '../../routes/app-routes';

const MemberGateway = () => {
  const { i18n } = useTranslation();
  const { token, lang } = useParams<{ token: string; lang: string }>();
  const { login } = useApp();
  const history = useHistory();

  useEffect(() => {
    login(token, true);
    i18n.changeLanguage(lang).then(() => {
      history.replace(appRoutes.home);
    });
  }, [history, i18n, lang, login, token]);

  return null;
};

export default MemberGateway;
