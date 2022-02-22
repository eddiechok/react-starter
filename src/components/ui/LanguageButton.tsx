import { Box, InputBase, Typography } from '@mui/material';
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
      languages.data?.map((lang) => ({
        img: lang.flag_url,
        title: lang.name,
        value: lang.locale
      })),
    [languages.data]
  );

  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang).then(() => {
      queryClient.invalidateQueries();
    });
  };

  return (
    <AppSelect
      value={i18n.languages[0]}
      onChange={(e) => changeLang(e.target.value as string)}
      input={<InputBase />} // remove border
      options={options}
      renderValue={(value) => (
        <Box
          sx={{
            display: 'flex',
            gap: 2
          }}
        >
          <img
            src={
              languages.data?.find((lang) => lang.locale === value)?.flag_url
            }
            width="25px"
          />
          <Typography variant="body1" color="text.primary">
            {languages.data?.find((lang) => lang.locale === value)?.name}
          </Typography>
        </Box>
      )}
      {...props}
      sx={{ color: (theme) => theme.palette.primary.contrastText, ...props.sx }}
    />
  );
};

export default LanguageButton;
