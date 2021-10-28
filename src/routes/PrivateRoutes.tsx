import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import DashboardPage from '../pages/dashboard/DashboardPage';
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
  }
];

export const PrivateRoutes = () => {
  return (
    <Switch>
      {getDefaultRoutes()}
      {privateRoutes.map(({ component: Component, ...route }, index) => {
        if (!Component) return null;
        return (
          <Route
            exact={route.exact !== undefined ? route.exact : true}
            path={route.path}
            key={index}
            render={(props) => (
              // <UnauthenticatedLayout>
              <Component {...props} />
              // </UnauthenticatedLayout>
            )}
          />
        );
      })}
      <Redirect to={appRoutes.home} />
    </Switch>
  );
};
