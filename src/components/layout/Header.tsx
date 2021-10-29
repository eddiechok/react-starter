import {
  Bookmark as BookmarkIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import {
  AppBar,
  IconButton,
  List,
  SwipeableDrawer,
  Toolbar,
  Typography
} from '@mui/material';
import React, { Fragment } from 'react';
import useToggle from '../../hooks/useToggle';
import appRoutes from '../../routes/app-routes';
import LanguageButton from '../ui/LanguageButton';
import DrawerItem, { DrawerItemProps } from './DrawerItem';

export type HeaderProps = {
  title?: string;
};

const drawerList: DrawerItemProps[] = [
  {
    title: 'Dashboard',
    link: appRoutes.home,
    icon: <HomeIcon />
  },
  {
    title: 'Profile',
    link: appRoutes.member.profile,
    icon: <PersonIcon />
  },
  {
    title: 'Examples',
    icon: <BookmarkIcon />,
    children: [
      {
        title: 'Infinite Scroll List',
        link: appRoutes.examples.infinite_scroll
      },
      {
        title: 'Secondary Password Dialog',
        link: appRoutes.examples.secondary_password_dialog
      }
    ]
  }
];

const Header = ({ title }: HeaderProps) => {
  const { isOpen, present, dismiss } = useToggle();

  return (
    <>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={present}
          >
            <MenuIcon />
          </IconButton>
          {title && (
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
          )}
          <LanguageButton />
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={isOpen}
        onClose={dismiss}
        onOpen={present}
      >
        <List>
          {drawerList.map((drawerItem, index) => (
            <Fragment key={index}>
              <DrawerItem {...drawerItem} />
            </Fragment>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default Header;