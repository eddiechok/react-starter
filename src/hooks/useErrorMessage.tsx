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
  const msg = useMemo(() => get(errors, name)?.message, [errors]);
  const [errorMsg, setErrorMsg] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const msgObj = msg && JSON.parse(msg);
      if (!msgObj || !msgObj.key) {
        setErrorMsg(msgObj);
      } else if (msgObj.data) {
        const { label, path, ...rest } = msgObj.data;
        setErrorMsg(
          t(msgObj.key, {
            label: msgLabel || label || (path ? t('common:' + path) : ''),
            ...rest
          })
        );
      } else {
        setErrorMsg(t(msgObj.key));
      }
    } catch (e) {
      // if msg cant be json parsed
      msg && setErrorMsg(msg);
    }
  }, [msg, msgLabel, t]);

  return errorMsg;
};

export default useErrorMessage;
