import { get } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type UseErrorMessageProps = {
  name: string;
  msgLabel?: string;
};

const useErrorMessage = ({ name, msgLabel }: UseErrorMessageProps) => {
  const {
    formState: { errors }
  } = useFormContext();
  const msg = useMemo(() => get(errors, name)?.message, [errors, name]);
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof msg === 'object') {
      if (!msg.key) {
        setErrorMsg('');
      } else if (msg.data) {
        const { label, path, ...rest } = msg.data;
        setErrorMsg(
          t(msg.key, {
            label: msgLabel || label || (path ? t('common:' + path) : ''),
            ...rest
          })
        );
      } else {
        setErrorMsg(t(msg.key));
      }
    } else {
      setErrorMsg(msg);
    }
  }, [msg, msgLabel, t]);

  return errorMsg;
};

export default useErrorMessage;
