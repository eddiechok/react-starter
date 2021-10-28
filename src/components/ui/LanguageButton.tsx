import { InputBase } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import useGetLanguages from '../../api/get/useGetLanguages';
import { SelectOption } from '../../shared/type';
import AppSelect, { AppSelectProps } from './AppSelect';

type LanguageButtonProps = AppSelectProps;

const LanguageButton = (props: LanguageButtonProps) => {
  const { i18n } = useTranslation();
  const queryClient = useQueryClient();

  const languages = useGetLanguages();
  const options = useMemo<SelectOption[] | undefined>(
    () =>
      languages.data?.map((lang) => ({ title: lang.name, value: lang.locale })),
    [languages.data]
  );

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.isStaleByTime(Infinity); // do not refetch queries that is stale for Infinity
        }
      });
    });
  };

  return (
    <AppSelect
      value={i18n.languages[0]}
      onChange={(e) => changeLang(e.target.value as string)}
      input={<InputBase />} // remove border
      options={options}
      {...props}
    />
  );
};

export default LanguageButton;
