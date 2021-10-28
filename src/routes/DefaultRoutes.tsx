import React from 'react';
import { Route } from 'react-router-dom';
import MemberGateway from '../pages/member-gateway/MemberGateway';
import appRoutes from './app-routes';
import { IRoute } from './route.model';

const publicRoutes: IRoute[] = [
  {
    path: appRoutes.gateway,
    component: MemberGateway
  }
];

export const getDefaultRoutes = () => {
  return publicRoutes.map(({ component: Component, ...route }, index) => {
    if (!Component) return null;
    return (
      <Route
        exact={route.exact !== undefined ? route.exact : true}
        path={route.path}
        key={index}
        render={(props) => <Component {...props} />}
      />
    );
  });
};
