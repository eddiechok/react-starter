import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthenticatedLayout from '../layout/AuthenticatedLayout';
import DashboardPage from '../pages/dashboard/DashboardPage';
import FormInputPage from '../pages/examples/FormInputPage';
import InfiniteScrollPage from '../pages/examples/InfiniteScrollPage';
import SecondaryPasswordDialogPage from '../pages/examples/SecondaryPasswordDialogPage';
import TreeListPage from '../pages/examples/TreeListPage';
import WheelSpinnerPage from '../pages/examples/WheelSpinnerPage';
import ProfilePage from '../pages/member/ProfilePage';
import appRoutes from './app-routes';
import { getDefaultRoutes } from './DefaultRoutes';
import { IRoute } from './route.model';

const privateRoutes: IRoute[] = [
  {
    path: appRoutes.home,
    component: DashboardPage
  },
  {
    path: appRoutes.member.profile,
    component: ProfilePage
  },
  {
    path: appRoutes.examples.infinite_scroll,
    component: InfiniteScrollPage
  },
  {
    path: appRoutes.examples.secondary_password_dialog,
    component: SecondaryPasswordDialogPage
  },
  {
    path: appRoutes.examples.form_input,
    component: FormInputPage
  },
  {
    path: appRoutes.examples.tree_list,
    component: TreeListPage
  },
  {
    path: appRoutes.examples.wheel_spinner,
    component: WheelSpinnerPage
  }
];

export const PrivateRoutes = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location } | null;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        {getDefaultRoutes()}
        <Route path="/" element={<AuthenticatedLayout />}>
          {privateRoutes.map(({ component: Component, ...route }, index) => {
            return <Route key={index} element={<Component />} {...route} />;
          })}
          <Route path="*" element={<Navigate to={appRoutes.home} />} />
          <Route index element={<Navigate to={appRoutes.home} />} />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          {privateRoutes
            .filter((route) => route.isModal)
            .map(({ component: Component, ...route }, index) => {
              return <Route key={index} element={<Component />} {...route} />;
            })}
        </Routes>
      )}
    </>
  );
};
