import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
    <Routes>
      {getDefaultRoutes()}
      {publicRoutes.map(({ component: Component, ...route }, index) => {
        return <Route key={index} element={<Component />} {...route} />;
      })}
      <Route path="*" element={<Navigate to={appRoutes.auth.login} />} />
    </Routes>
  );
};
