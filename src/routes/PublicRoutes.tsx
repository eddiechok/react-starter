import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ForgetPasswordPage from '../pages/auth/ForgetPasswordPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import appRoutes from './app-routes';
import { getDefaultRoutes } from './DefaultRoutes';
import { IRoute } from './route.model';

const publicRoutes: IRoute[] = [
  {
    path: appRoutes.auth.login,
    component: LoginPage
  },
  {
    path: appRoutes.auth.register({ path: true }),
    component: SignupPage
  },
  {
    path: appRoutes.auth.forget_password(),
    component: ForgetPasswordPage
  }
];

export const PublicRoutes = () => {
  return (
    <Switch>
      {getDefaultRoutes()}
      {publicRoutes.map(({ component: Component, ...route }, index) => {
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
      <Redirect to={appRoutes.auth.login} />
    </Switch>
  );
};
