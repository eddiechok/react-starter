import useGetWalletBalance from '@/api/get/useGetWalletBalance';
import AppDropdown from '@/components/ui/AppDropdown';
import useCustomNavigate from '@/hooks/useCustomNavigate';
import useDropdown from '@/hooks/useDropdown';
import { useAlert } from '@/providers/AlertDialogProvider';
import { useApp } from '@/providers/AppProvider';
import appRoutes from '@/routes/app-routes';
import { DRAWER_WIDTH } from '@/shared/constants';
import { SelectOption, ToggleProps } from '@/shared/type';
import commonLabel from '@/translation/commonLabel';
import { Box, Drawer, List, Toolbar } from '@mui/material';
import React, { Fragment, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import DrawerItem, { DrawerItemProps } from './DrawerItem';

export type SidebarProps = Omit<ToggleProps, 'present'>;

const Sidebar = ({ isOpen, dismiss }: SidebarProps) => {
  const { t } = useTranslation();
  const { logout } = useApp();
  const [presentAlert] = useAlert();
  const navigate = useCustomNavigate();
  const walletBalance = useGetWalletBalance({ refetchOnMount: false });
  const wallet = useMemo(() => walletBalance.data?.[0], [walletBalance.data]);
  const depositDropdown = useDropdown();

  const onDeposit = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (wallet) {
        if (wallet.setup.blockchain_deposit.length > 1) {
          depositDropdown.present(event);
        } else {
          navigate(
            appRoutes.wallet.deposit({
              from: wallet.setup.blockchain_deposit[0].ewallet_type_code,
              to: wallet.ewallet_type_code
            }),
            { isModal: true }
          );
        }
      }
    },
    [depositDropdown, navigate, wallet]
  );

  const depositOptions = useMemo<SelectOption[]>(
    () =>
      wallet?.setup.blockchain_deposit.map((bc) => ({
        title: bc.ewallet_type_name,
        value: bc.ewallet_type_code,
        onClick: () => {
          dismiss?.();
          navigate(
            appRoutes.wallet.deposit({
              from: bc.ewallet_type_code,
              to: wallet?.ewallet_type_code
            }),
            { isModal: true }
          );
        }
      })) || [],
    [
      dismiss,
      navigate,
      wallet?.ewallet_type_code,
      wallet?.setup.blockchain_deposit
    ]
  );

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
      },
      {
        title: 'Wallet',
        children: [
          {
            title: 'Deposit',
            onClick: onDeposit
          },
          {
            title: 'Withdrawal',
            link: appRoutes.wallet.withdrawal({ from: 'USDT' })
          }
        ]
      }
    ],
    [onDeposit]
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
      <AppDropdown {...depositDropdown.menuProps} options={depositOptions} />
    </>
  );
};

export default Sidebar;
