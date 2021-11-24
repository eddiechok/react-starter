import { Box, Drawer, List, Toolbar } from '@mui/material';
import React, { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAlert } from '../contexts/AlertDialogContext';
import { useApp } from '../contexts/AppContext';
import appRoutes from '../routes/app-routes';
import { DRAWER_WIDTH } from '../shared/constants';
import { ToggleProps } from '../shared/type';
import commonLabel from '../translation/commonLabel';
import DrawerItem, { DrawerItemProps } from './DrawerItem';

export type SidebarProps = Omit<ToggleProps, 'present'>;

const Sidebar = ({ isOpen, dismiss }: SidebarProps) => {
  const { t } = useTranslation();
  const { logout } = useApp();
  const [presentAlert] = useAlert();

  const drawerList = useMemo<DrawerItemProps[]>(
    () => [
      {
        title: 'Dashboard',
        link: appRoutes.home
      },
      {
        title: 'Examples',
        children: [
          {
            title: 'Infinite Scroll List',
            link: appRoutes.examples.infinite_scroll
          },
          {
            title: 'Secondary Password Dialog',
            link: appRoutes.examples.secondary_password_dialog
          },
          {
            title: 'Form Input',
            link: appRoutes.examples.form_input
          },
          {
            title: 'Tree List',
            link: appRoutes.examples.tree_list
          },
          {
            title: 'Wheel Spinner',
            link: appRoutes.examples.wheel_spinner
          }
        ]
      }
    ],
    [t]
  );

  const drawer = (
    <>
      <Toolbar>
        {/* <img
          src={Logo}
          style={{
            width: 123,
            paddingLeft: 16
          }}
          alt=""
        /> */}
      </Toolbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
          height: 1
        }}
      >
        <List>
          {drawerList.map((drawerItem, index) => (
            <Fragment key={index}>
              <DrawerItem {...drawerItem} closeDrawer={dismiss} />
            </Fragment>
          ))}
        </List>
        <List>
          <DrawerItem
            title={t(commonLabel.sign_out)}
            // icon={LogoutIcon}
            onClick={() => {
              presentAlert({
                message: t(commonLabel.are_you_sure_to_sign_out),
                confirmButton: {
                  handler: logout
                }
              });
            }}
            closeDrawer={dismiss}
          />
        </List>
      </Box>
    </>
  );

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={dismiss}
        PaperProps={{
          sx: {
            bgcolor: 'secondary.main',
            color: 'secondary.light'
          }
        }}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        variant="temporary"
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH
          }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH
          }
        }}
        open
        PaperProps={{
          sx: {
            bgcolor: 'secondary.main',
            color: 'secondary.light'
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;
