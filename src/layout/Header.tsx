import useGetSettingStatus from '@/api/get/useGetSettingStatus';
import LanguageButton from '@/components/ui/LanguageButton';
import useCustomNavigate from '@/hooks/useCustomNavigate';
import { useApp } from '@/providers/AppProvider';
import appRoutes from '@/routes/app-routes';
import { DRAWER_WIDTH, HAS_SIDEBAR } from '@/shared/constants';
import { ToggleProps } from '@/shared/type';
import { truncateSx } from '@/styles/styles';
import { Menu as MenuIcon, Person } from '@mui/icons-material';
import {
  AppBar,
  AppBarProps,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

export type HeaderProps = AppBarProps &
  Pick<ToggleProps, 'present'> & {
    title?: string;
  };

const pathToClose = [
  appRoutes.member.profile,
  appRoutes.member.login_password,
  appRoutes.member.transaction_password
];

const Header = ({ title, present, ...props }: HeaderProps) => {
  const { isAuthenticated } = useApp();
  const navigate = useCustomNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const settingStatus = useGetSettingStatus();

  const profileHandler = () => {
    pathToClose.find((pathname) => pathname === location.pathname)
      ? navigate(-1)
      : navigate(appRoutes.member.profile, {
          state: {
            backgroundLocation: location
          }
        });
  };

  return (
    <AppBar
      position="fixed"
      color="inherit"
      {...props}
      sx={{
        width: { lg: isAuthenticated ? `calc(100% - ${DRAWER_WIDTH}px)` : 1 },
        ml: { lg: isAuthenticated ? `${DRAWER_WIDTH}px` : 0 },
        boxShadow: '0px 3px 6px #00000014',
        ...props.sx
      }}
    >
      <Toolbar>
        {HAS_SIDEBAR && isAuthenticated && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: isAuthenticated ? { lg: 'none' } : 'none' }}
            onClick={present}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, ...truncateSx }}>
          {title}
        </Typography>
        <IconButton
          sx={{
            mr: 1
          }}
          onClick={profileHandler}
        >
          <Box
            sx={
              {
                // width: '38px',
                // height: '38px',
                // p: '3px'
                // background: `url(${ProfileBg}) no-repeat center / cover`
              }
            }
          >
            {/* <Avatar
              sx={{ width: 1, height: 1, borderRadius: '999px' }}
              src={
                (settingStatus.data?.avatar !== '' &&
                  settingStatus.data?.avatar) ||
                ProfileDefIcon
              }
            /> */}
            <Avatar>
              <Person />
            </Avatar>
          </Box>
        </IconButton>
        <LanguageButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
