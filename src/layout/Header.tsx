import LanguageButton from '@/components/ui/LanguageButton';
import useCustomNavigate from '@/hooks/useCustomNavigate';
import { useApp } from '@/providers/AppProvider';
import appRoutes from '@/routes/app-routes';
import { DRAWER_WIDTH, HAS_SIDEBAR } from '@/shared/constants';
import { ToggleProps } from '@/shared/type';
import { styles } from '@/styles/styles';
import { Menu as MenuIcon, Person } from '@mui/icons-material';
import {
  AppBar,
  AppBarProps,
  IconButton,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';

export type HeaderProps = AppBarProps &
  Pick<ToggleProps, 'present'> & {
    title?: string;
  };

const Header = ({ title, present, ...props }: HeaderProps) => {
  const { isAuthenticated } = useApp();
  const navigate = useCustomNavigate();

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
        <Typography variant="h6" sx={{ flexGrow: 1, ...styles.text.truncate }}>
          {title}
        </Typography>
        <IconButton
          sx={{
            mr: 1
          }}
          onClick={() => navigate(appRoutes.member.profile)}
        >
          <Person />
        </IconButton>
        <LanguageButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
